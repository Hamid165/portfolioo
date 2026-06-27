import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal, { ScrollRevealItem } from './ScrollReveal';
import { education } from '../data/portfolio';
import { FiBookOpen, FiCalendar, FiAward } from 'react-icons/fi';
import './Education.css';

export default function Education() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineScaleY = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section className="education section" id="education" ref={ref}>
      <div className="education__bg-accent" />

      <div className="container">
        <ScrollReveal className="education__header">
          <span className="section-eyebrow">My Background</span>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            Perjalanan akademik yang membentuk fondasi pengetahuan dan keterampilan saya
          </p>
        </ScrollReveal>

        <div className="education__timeline">
          {/* Animated vertical line */}
          <div className="education__line-track">
            <motion.div
              className="education__line-fill"
              style={{ scaleY: lineScaleY, originY: 0 }}
            />
          </div>

          <div className="education__entries">
            {education.map((item, i) => (
              <ScrollReveal
                key={item.id}
                variant={i % 2 === 0 ? 'slideLeft' : 'slideRight'}
                delay={i * 0.15}
                className="education__entry-wrapper"
              >
                {/* Timeline dot */}
                <motion.div
                  className="education__dot"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 200 }}
                >
                  <div className="education__dot-inner" />
                </motion.div>

                {/* Card */}
                <motion.div
                  className={`education__card glass-card ${i % 2 === 0 ? 'education__card--left' : 'education__card--right'}`}
                  whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(108,99,255,0.18)' }}
                >
                  {/* Year badge */}
                  <div className="education__year">
                    <FiCalendar className="education__year-icon" />
                    {item.year}
                  </div>

                  {/* Degree */}
                  <div className="education__degree-row">
                    <FiBookOpen className="education__degree-icon" />
                    <h3 className="education__degree">{item.degree}</h3>
                  </div>

                  {/* School */}
                  <p className="education__school">{item.school}</p>

                  {/* Description */}
                  <p className="education__desc">{item.description}</p>

                  {/* GPA if available */}
                  {item.gpa && (
                    <div className="education__gpa">
                      <FiAward className="education__gpa-icon" />
                      <span>GPA: <strong>{item.gpa}</strong></span>
                    </div>
                  )}

                  {/* Decorative gradient border */}
                  <div className="education__card-glow" />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
