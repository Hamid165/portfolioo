import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personalInfo } from '../data/portfolio';
import { FiGithub, FiLinkedin, FiInstagram, FiArrowDown } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';
import profileImg from '../assets/saya.jpg';
import './Hero.css';

function TypewriterText({ texts, speed = 80, pause = 1800 }) {
  const [displayed, setDisplayed] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx(i => (i + 1) % texts.length);
    }
    setDisplayed(current.substring(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return (
    <span className="hero__typewriter">
      {displayed}
      <span className="hero__cursor">|</span>
    </span>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, 60]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const handleScrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">

      <div className="hero__container">
        {/* Left — Text Content */}
        <motion.div className="hero__content" style={{ y: textY, opacity }}>


          {/* Greeting */}
          <motion.p
            className="hero__greeting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Hi there 👋 I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            className="hero__name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {personalInfo.name}
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            className="hero__role"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <TypewriterText
              texts={['Web Developer', 'Laravel & PHP', 'Flutter Developer', 'UI/UX Design']}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="hero__tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {personalInfo.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
          >
            <motion.a
              href="#projects"
              className="hero__btn hero__btn--primary"
              id="hero-view-projects"
              onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(108,99,255,0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="hero__socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            {[
              { href: personalInfo.social.github, icon: <FiGithub />, label: 'GitHub', id: 'hero-github' },
              { href: personalInfo.social.linkedin, icon: <FiLinkedin />, label: 'LinkedIn', id: 'hero-linkedin' },
              { href: personalInfo.social.instagram, icon: <FiInstagram />, label: 'Instagram', id: 'hero-instagram' },
              { href: personalInfo.social.tiktok, icon: <SiTiktok />, label: 'TikTok', id: 'hero-tiktok' },
            ].map(({ href, icon, label, id }) => (
              <motion.a
                key={id} id={id} href={href}
                target="_blank" rel="noopener noreferrer"
                className="hero__social-link" aria-label={label}
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                {icon}
              </motion.a>
            ))}
            <div className="hero__social-divider" />
            <span className="hero__social-text">Follow me</span>
          </motion.div>
        </motion.div>

        {/* Right — Image */}
        <motion.div
          className="hero__visuals"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <div className="hero__image-wrapper">
            <img src={profileImg} alt={personalInfo.name} className="hero__profile-img" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="hero__scroll-indicator"
        id="hero-scroll-down"
        onClick={handleScrollDown}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiArrowDown size={20} />
        </motion.div>
        <span>Scroll Down</span>
      </motion.button>
    </section>
  );
}
