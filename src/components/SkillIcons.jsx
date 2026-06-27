import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { SiHtml5, SiCss, SiJavascript, SiPhp, SiLaravel, SiMysql, SiFlutter, SiFirebase } from 'react-icons/si';
import './SkillIcons.css';

export default function SkillIcons() {
  const skills = [
    { name: 'HTML', icon: <SiHtml5 /> },
    { name: 'CSS', icon: <SiCss /> },
    { name: 'JavaScript', icon: <SiJavascript /> },
    { name: 'PHP', icon: <SiPhp /> },
    { name: 'Laravel', icon: <SiLaravel /> },
    { name: 'MySQL', icon: <SiMysql /> },
    { name: 'Flutter', icon: <SiFlutter /> },
    { name: 'Firebase', icon: <SiFirebase /> }
  ];

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

        <div className="skill-icons__container">
          {skills.map((tech, i) => (
            <motion.div
              key={tech.name}
              className="skill-icons__badge"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.1, y: -5, borderColor: 'rgba(108, 99, 255, 0.5)' }}
            >
              <span className="skill-icons__icon">{tech.icon}</span>
              <span className="skill-icons__name">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
