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
        </ScrollReveal>

          {/* Text content */}
          <ScrollReveal variant="slideLeft" className="about__text-col">
            <div className="about__bio">
              <p>{personalInfo.bio}</p>
              <p className="about__bio-extra">
                Bagi saya, teknologi bukan sekadar menulis baris kode yang berfungsi, tetapi juga tentang bagaimana menciptakan pengalaman digital yang intuitif dan bermakna. Saya selalu antusias menjadikan setiap proyek sebagai kesempatan untuk belajar, berinovasi, dan memberikan dampak positif melalui solusi yang dikembangkan.
              </p>
            </div>




          </ScrollReveal>


      </div>
    </section>
  );
}
