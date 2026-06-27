import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal, { ScrollRevealItem } from './ScrollReveal';
import { skills } from '../data/portfolio';
import './Skills.css';

function SkillBar({ name, level, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div className="skill__item" ref={ref}>
      <div className="skill__item-header">
        <span className="skill__name">{name}</span>
        <span className="skill__level">{level}%</span>
      </div>
      <div className="skill__bar-track">
        <motion.div
          className="skill__bar-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay: delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="skills section" id="skills">
      <div className="container">
        <ScrollReveal className="skills__header">
          <span className="section-eyebrow">What I can do</span>
          <h2 className="section-title">My Skills</h2>
          <p className="section-subtitle">
            Teknologi dan tools yang saya kuasai untuk membangun produk digital yang berkualitas
          </p>
        </ScrollReveal>

        {/* Skills grid — full width, no embedded 3D */}
        <ScrollReveal stagger className="skills__grid">
          {skills.map((category, i) => (
            <ScrollRevealItem key={i}>
              <motion.div
                className="skill__category glass-card"
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(108,99,255,0.15)' }}
              >
                <div className="skill__category-header">
                  <span className="skill__category-icon">{category.icon}</span>
                  <h3 className="skill__category-title">{category.category}</h3>
                </div>

                <div className="skill__items">
                  {category.items.map((skill, j) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={j * 0.1}
                    />
                  ))}
                </div>
              </motion.div>
            </ScrollRevealItem>
          ))}
        </ScrollReveal>

        {/* Tech badges row */}
        <div className="skills__tech-badges">
          {['HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'MySQL', 'Figma', 'Flutter', 'Firebase'].map((tech, i) => (
            <motion.span
              key={tech}
              className="skills__tech-badge"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 + 0.3, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.12, y: -3 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
