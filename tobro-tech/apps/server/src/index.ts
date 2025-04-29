import express from "express";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";
import { resolve, join } from "path";
import fs from "fs";
import tus from "tus-node-server";
import multer from "multer";
import type { Request, Response, NextFunction } from "express";

const app = express();
const prisma = new PrismaClient();
const uploadDir = process.env.TUS_UPLOAD_DIR || resolve(__dirname, "../../../uploads");
const tmpDir = join(uploadDir, "tmp");

// Ensure tmp dir exists
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

// Middleware
app.use(express.json());
app.use(cookieParser());

// Session: assign guestId if not present
app.use((req: Request, res: Response, next: NextFunction) => {
  let guestId = req.cookies.guestId;
  if (!guestId) {
    guestId = uuidv4();
    res.cookie("guestId", guestId, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      sameSite: "lax",
    });
  }
  (req as any).guestId = guestId;
  next();
});

// tus-node-server for resumable uploads
const tusServer = new tus.Server({ path: "/files" });
tusServer.datastore = new tus.FileStore({ directory: uploadDir });

app.all("/files/*", (req, res) => {
  tusServer.handle.bind(tusServer)(req, res);
});

// Multer setup for /api/rfq
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, tmpDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// POST /api/rfq – save RFQ json + file paths (no auth)
app.post("/api/rfq", upload.fields([
  { name: "stepFile", maxCount: 1 },
  { name: "drawingFile", maxCount: 1 },
]), async (req, res) => {
  const guestId = (req as any).guestId;
  const { name, email, quantity, material, notes } = req.body;
  const stepFile = req.files && (req.files as any)["stepFile"]?.[0];
  const drawingFile = req.files && (req.files as any)["drawingFile"]?.[0];
  // Validation
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!name || !email || !quantity || !material || !stepFile) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  const qty = parseInt(quantity, 10);
  if (isNaN(qty) || qty < 1 || qty > 100000) {
    return res.status(400).json({ error: "Invalid quantity" });
  }
  if (notes && notes.length > 2000) {
    return res.status(400).json({ error: "Notes too long" });
  }
  // Create RFQ record to get rfqId
  const rfq = await prisma.rFQ.create({
    data: {
      guestId,
      name,
      email,
      quantity: qty,
      material,
      notes: notes || null,
      partPath: "",
      drawingPath: drawingFile ? "" : null,
      status: "new",
    },
  });
  // Move files to /uploads/${guestId}/${rfqId}/
  const destDir = join(uploadDir, guestId, rfq.id);
  fs.mkdirSync(destDir, { recursive: true });
  // Move part file
  const partDest = join(destDir, stepFile.originalname);
  fs.renameSync(stepFile.path, partDest);
  // Move drawing file if exists
  let drawingDest = null;
  if (drawingFile) {
    drawingDest = join(destDir, drawingFile.originalname);
    fs.renameSync(drawingFile.path, drawingDest);
  }
  // Update RFQ
  await prisma.rFQ.update({
    where: { id: rfq.id },
    data: {
      partPath: partDest,
      drawingPath: drawingDest,
    },
  });
  res.json({ success: true, rfqId: rfq.id });
});

// GET /api/rfq/:id – only if guestId matches
app.get("/api/rfq/:id", async (req, res) => {
  const guestId = (req as any).guestId;
  const rfq = await prisma.rFQ.findUnique({ where: { id: req.params.id } });
  if (!rfq || rfq.guestId !== guestId) {
    return res.status(404).json({ error: "Not found" });
  }
  res.json({
    status: rfq.status,
    name: rfq.name,
    email: rfq.email,
    quantity: rfq.quantity,
    material: rfq.material,
    notes: rfq.notes,
    partPath: rfq.partPath,
    drawingPath: rfq.drawingPath,
    createdAt: rfq.createdAt,
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
