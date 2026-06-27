import { useRef } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal, { ScrollRevealItem } from './ScrollReveal';
import { personalInfo } from '../data/portfolio';

import './About.css';



export default function About() {
  return (
    <section className="about section" id="about">
      {/* Background accent */}
      <div className="about__bg-accent" />

      <div className="container">
        {/* Header */}
        <ScrollReveal className="about__header">
          <span className="section-eyebrow">Get to know me</span>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Pengembang yang bersemangat dalam menciptakan pengalaman digital yang elegan
          </p>
        </ScrollReveal>

          {/* Text content */}
          <ScrollReveal variant="slideLeft" className="about__text-col">
            <div className="about__bio">
              <p>{personalInfo.bio}</p>
              <p className="about__bio-extra">
                Saya percaya bahwa teknologi yang baik bukan hanya soal kode yang berjalan dengan benar, tetapi juga tentang pengalaman yang menyenangkan bagi pengguna. Setiap project adalah kesempatan untuk belajar hal baru dan menciptakan sesuatu yang bermakna.
              </p>
            </div>




          </ScrollReveal>


      </div>
    </section>
  );
}
