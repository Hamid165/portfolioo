import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal, { ScrollRevealItem } from './ScrollReveal';
import { projects } from '../data/portfolio';
import { FiGithub, FiExternalLink, FiX, FiCode } from 'react-icons/fi';
import './Projects.css';

function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="project-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="project-modal"
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 40 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Glow bar */}
          <div className="project-modal__glow" style={{ background: project.color }} />

          {/* Close */}
          <button className="project-modal__close" onClick={onClose} aria-label="Close modal">
            <FiX />
          </button>

          {/* Year */}
          <span className="project-modal__year">{project.year}</span>

          {/* Title */}
          <h3 className="project-modal__title">{project.title}</h3>

          {/* Description */}
          <p className="project-modal__desc">{project.description}</p>

          {/* Main Image */}
          {project.image && (
            <div style={{ marginTop: '1rem', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', maxHeight: '350px', display: 'flex', alignItems: 'flex-start' }}>
              <img src={project.image} alt={`${project.title} screenshot`} style={{ width: '100%', height: '100%', maxHeight: '350px', display: 'block', objectFit: 'cover', objectPosition: 'top center' }} />
            </div>
          )}

          {/* Tags */}
          <div className="project-modal__tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-modal__tag">{tag}</span>
            ))}
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="projects section" id="projects">
      <div className="projects__bg-accent" />

      <div className="container">
        <ScrollReveal className="projects__header">
          <span className="section-eyebrow">My Work</span>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            Beberapa project yang telah saya kerjakan - mulai dari pengembangan website hingga aplikasi mobile
          </p>
        </ScrollReveal>

        {/* Projects grid */}
        <ScrollReveal stagger className="projects__grid">
          {projects.map((project, index) => (
            <ScrollRevealItem key={project.id} variant={index % 2 === 0 ? 'slideLeft' : 'slideRight'}>
              <motion.div
                className="project-card glass-card"
                id={`project-card-${project.id}`}
                whileHover={{ y: -10, boxShadow: `0 25px 50px ${project.color}25` }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Color accent top bar */}
                <div
                  className="project-card__bar"
                  style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                />

                {/* Image or placeholder */}
                <div className="project-card__image" style={{ '--project-color': project.color }}>
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="project-card__img" />
                  ) : (
                    <div className="project-card__image-inner">
                      <FiCode size={40} />
                    </div>
                  )}
                  <div className="project-card__image-glow" style={{ background: project.color }} />
                </div>

                {/* Content */}
                <div className="project-card__content">
                  <div className="project-card__top">
                    <span className="project-card__year">{project.year}</span>
                  </div>

                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__desc">{project.description}</p>

                  <div className="project-card__tags">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="project-card__tag">{tag}</span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="project-card__tag project-card__tag--more">+{project.tags.length - 3}</span>
                    )}
                  </div>

                  <motion.button
                    className="project-card__detail-btn"
                    whileHover={{ gap: '0.75rem' }}
                  >
                    View Details
                    <FiExternalLink size={14} />
                  </motion.button>
                </div>
              </motion.div>
            </ScrollRevealItem>
          ))}
        </ScrollReveal>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
