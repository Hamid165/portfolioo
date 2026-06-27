import { motion } from 'framer-motion';
import { personalInfo, navLinks } from '../data/portfolio';
import { FiGithub, FiLinkedin, FiInstagram, FiHeart } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNavClick = (href) => {
    const target = document.querySelector(href);
    if (target) {
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer__glow" />

      <div className="container footer__container">
        {/* Brand */}
        <div className="footer__brand">
          <motion.a
            href="#home"
            className="footer__logo"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="footer__logo-bracket">{'<'}</span>
            <span className="footer__logo-name">HS</span>
            <span className="footer__logo-bracket">{'/>'}</span>
          </motion.a>
          <p className="footer__tagline">{personalInfo.tagline}</p>

          {/* Socials */}
          <div className="footer__socials">
            {[
              { href: personalInfo.social.github, icon: <FiGithub />, id: 'footer-github', label: 'GitHub' },
              { href: personalInfo.social.linkedin, icon: <FiLinkedin />, id: 'footer-linkedin', label: 'LinkedIn' },
              { href: personalInfo.social.instagram, icon: <FiInstagram />, id: 'footer-instagram', label: 'Instagram' },
              { href: personalInfo.social.tiktok, icon: <SiTiktok />, id: 'footer-tiktok', label: 'TikTok' },
            ].map(({ href, icon, id, label }) => (
              <motion.a
                key={id}
                id={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label={label}
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav className="footer__nav">
          <h4 className="footer__nav-title">Navigation</h4>
          <ul className="footer__nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="footer__nav-link"
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact info */}
        <div className="footer__contact">
          <h4 className="footer__nav-title">Contact</h4>
          <ul className="footer__contact-list">
            <li>
              <a href={`mailto:${personalInfo.email}`} className="footer__contact-item">
                {personalInfo.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            © {year} {personalInfo.name}. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}
