import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { personalInfo } from '../data/portfolio';
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate sending
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  const contactItems = [
    { icon: <FiMail />, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  ];

  const socialLinks = [
    { icon: <FiGithub />, label: 'GitHub', href: personalInfo.social.github, id: 'contact-github' },
    { icon: <FiLinkedin />, label: 'LinkedIn', href: personalInfo.social.linkedin, id: 'contact-linkedin' },
    { icon: <FiInstagram />, label: 'Instagram', href: personalInfo.social.instagram, id: 'contact-instagram' },
    { icon: <SiTiktok />, label: 'TikTok', href: personalInfo.social.tiktok, id: 'contact-tiktok' },
  ];

  return (
    <section className="contact section" id="contact">
      <div className="contact__bg-orb contact__bg-orb--1" />
      <div className="contact__bg-orb contact__bg-orb--2" />

      <div className="container">
        <ScrollReveal className="contact__header">
          <span className="section-eyebrow">Get In Touch</span>
          <h2 className="section-title">Contact Me</h2>

        </ScrollReveal>

        <div className="contact__grid">
          {/* Info column */}
          <ScrollReveal variant="slideLeft" className="contact__info">
            <div className="contact__info-card glass-card">
              <h3 className="contact__info-title">Let's Connect</h3>
              <p className="contact__info-desc">
                Saya selalu terbuka untuk peluang baru, kolaborasi, dan diskusi menarik. Jangan ragu untuk menghubungi saya!
              </p>

              {/* Contact details */}
              <div className="contact__details">
                {contactItems.map(({ icon, label, value, href }) => (
                  <div key={label} className="contact__detail-item">
                    <span className="contact__detail-icon">{icon}</span>
                    <div>
                      <p className="contact__detail-label">{label}</p>
                      {href ? (
                        <a href={href} className="contact__detail-value contact__detail-link">{value}</a>
                      ) : (
                        <p className="contact__detail-value">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="contact__socials">
                <p className="contact__socials-title">Follow Me</p>
                <div className="contact__social-links">
                  {socialLinks.map(({ icon, label, href, id }) => (
                    <motion.a
                      key={id}
                      id={id}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact__social-btn"
                      aria-label={label}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {icon}
                      <span>{label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>


            </div>
          </ScrollReveal>




        </div>
      </div>
    </section>
  );
}
