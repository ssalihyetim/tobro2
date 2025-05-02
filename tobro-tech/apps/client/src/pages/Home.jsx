import React from "react";
import styles from "../styles/Home.module.css";

const SERVICES = [
  {
    name: 'CNC Lathe',
    link: '/services/cnc-lathe',
    desc: 'Precision CNC turning for cylindrical parts, shafts, and complex geometries with tight tolerances.',
    bullets: [
      'Tolerances as tight as ±0.001 in (0.025 mm)',
      'Rapid prototyping and production for all industries'
    ]
  },
  {
    name: 'CNC Milling',
    link: '/services/cnc-milling',
    desc: 'High-precision CNC milling for prismatic parts, pockets, slots, and 3D features in metals and plastics.',
    bullets: [
      'Complex 2D/3D shapes and surface finishes',
      'Lead times starting at just 1 day'
    ]
  },
  {
    name: 'CNC 5 Axis Machining',
    link: '/services/cnc-5axis',
    desc: 'Simultaneous 5-axis CNC machining for intricate, multi-sided parts in a single setup.',
    bullets: [
      'Unmatched accuracy for aerospace, medical, and more',
      'Reduced setups and faster delivery for complex parts'
    ]
  },
  {
    name: 'Rapid Prototyping',
    link: '/services/rapid-prototyping',
    desc: 'Accelerate your product development with fast, accurate prototypes using a range of manufacturing technologies.',
    bullets: [
      'Parts delivered in as fast as 1-3 days',
      'Iterate designs quickly with no minimum order'
    ]
  },
  {
    name: 'Sheet Metal Fabrication',
    link: '/services/sheet-metal-fabrication',
    desc: 'Precision laser cutting, bending, welding, and stamping for custom sheet metal parts and assemblies.',
    bullets: [
      'Lead times from 3 days',
      'Wall thickness as thin as 0.008 in (0.2mm)'
    ]
  },
  {
    name: 'Surface Finishing and Coating',
    link: '/services/surface-finishing',
    desc: 'Enhance part performance and aesthetics with anodizing, powder coating, plating, bead blasting, and more.',
    bullets: [
      'Wide range of finishes for metals & plastics',
      'Improved durability, corrosion resistance, and look'
    ]
  },
  {
    name: 'Grinding',
    link: '/services/grinding',
    desc: 'High-precision surface, cylindrical, and centerless grinding for tight tolerances and superior finishes.',
    bullets: [
      'Tolerances as tight as ±0.0002 in (0.005mm)',
      'Flatness and surface finish to meet demanding specs'
    ]
  },
  {
    name: 'Swiss Machining',
    link: '/services/swiss-machining',
    desc: 'Swiss-type CNC turning for complex, high-precision parts in large or small quantities.',
    bullets: [
      'Ideal for small, intricate components',
      'Unmatched accuracy for medical, aerospace, and more'
    ]
  }
];

export default function Home() {
  return (
    <div className={styles.homeRoot}>
      <section className={styles.hero}>
        {/* Video background and overlay omitted for now */}
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle} style={{fontSize:'3rem'}}>Precision CNC Machining You Can Trust</h1>
          <div className={styles.heroSubtitle}>
            ISO 9001 Certified Excellence in Turning, Milling, and 5-Axis Machining
          </div>
          <div className={styles.heroActions}>
            <a href="/request-a-quote" className={styles.heroBtn}>Request a Quote</a>
            <a href="/services" className={styles.heroBtn + ' ' + styles.heroBtnSecondary}>View Capabilities</a>
          </div>
        </div>
        {/* BannerQuoteBox omitted for now */}
      </section>
      <section className={styles.section}>
        <div className={styles.cardsRow}>
          {SERVICES.map(service => (
            <div className={styles.card} key={service.name}>
              <a href={service.link} style={{fontWeight:700,fontSize:'1.18rem',color:'#222',textDecoration:'none',display:'inline-block',marginBottom:'0.5rem'}}>
                {service.name}
                <span className={styles.serviceTitleIcon}>
                  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" style={{display:'inline',verticalAlign:'middle'}}>
                    <path d="M10 13.5A3.5 3.5 0 1 0 10 6.5a3.5 3.5 0 0 0 0 7zm7.03-2.02l-1.06-.18a6.98 6.98 0 0 0-.5-1.2l.64-.88a.75.75 0 0 0-.09-.97l-1.06-1.06a.75.75 0 0 0-.97-.09l-.88.64a6.98 6.98 0 0 0-1.2-.5l-.18-1.06a.75.75 0 0 0-.74-.62h-1.5a.75.75 0 0 0-.74.62l-.18 1.06a6.98 6.98 0 0 0-1.2.5l-.88-.64a.75.75 0 0 0-.97.09l-1.06 1.06a.75.75 0 0 0-.09.97l.64.88a6.98 6.98 0 0 0-.5 1.2l-1.06.18a.75.75 0 0 0-.62.74v1.5c0 .37.27.68.62.74l1.06.18c.12.42.29.82.5 1.2l-.64.88a.75.75 0 0 0 .09.97l1.06 1.06c.27.27.7.3.97.09l.88-.64c.38.21.78.38 1.2.5l.18 1.06c.06.35.37.62.74.62h1.5c.37 0 .68-.27.74-.62l.18-1.06c.42-.12.82-.29 1.2-.5l.88.64c.27.21.7.18.97-.09l1.06-1.06a.75.75 0 0 0 .09-.97l-.64-.88c.21-.38.38-.78.5-1.2l1.06-.18c.35-.06.62-.37.62-.74v-1.5a.75.75 0 0 0-.62-.74zM10 14.5A4.5 4.5 0 1 1 10 5.5a4.5 4.5 0 0 1 0 9z" fill="currentColor"/>
                  </svg>
                </span>
              </a>
              <div style={{fontSize:'1.01rem',color:'#444',marginBottom:'0.8rem',minHeight:'48px'}}>{service.desc}</div>
              <ul style={{listStyle:'none',padding:0,margin:0}}>
                {service.bullets.map((b,i) => (
                  <li key={i} style={{display:'flex',alignItems:'flex-start',marginBottom:'0.4em'}}>
                    <span className={styles.serviceBulletIcon}>
                      <svg width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" style={{display:'inline',verticalAlign:'middle'}}><path d="M7.5 4.5l5 5-5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                    </span>
                    <span style={{fontSize:'0.99em',color:'#222'}}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
