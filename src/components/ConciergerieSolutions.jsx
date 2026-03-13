import { useState, useEffect } from "react";

const services = [
  { name: "Alimentation", icon: "🧺", desc: "Courses, livraisons, préparation de repas à domicile" },
  { name: "A domicile", icon: "🏠", desc: "Ménage, entretien, petits travaux et bricolage" },
  { name: "Habillement", icon: "👔", desc: "Pressing, retouches, personal shopping" },
  { name: "Bien-être", icon: "🧘", desc: "Massage, coaching sportif, soins personnels" },
  { name: "Administratif", icon: "✉️", desc: "Courrier, démarches, gestion de documents" },
  { name: "Mobilité", icon: "🚗", desc: "Transport, accompagnement, véhicule de courtoisie" },
  { name: "Enfants", icon: "👨‍👧‍👦", desc: "Garde d'enfants, aide aux devoirs, activités" },
];

export default function ConciergerieSolutions() {
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [visible, setVisible] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    setVisible(true);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#003249", background: "#f8fbfb", minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 20px 0;
        }
        .nav.scrolled {
          background: rgba(0, 50, 73, 0.95);
          backdrop-filter: blur(20px);
          padding: 12px 0;
          box-shadow: 0 4px 30px rgba(0,50,73,0.15);
        }

        .service-card {
          background: white;
          border-radius: 20px;
          padding: 36px 28px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid #e8f0f0;
          position: relative;
          overflow: hidden;
        }
        .service-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #007EA7, #80CED7);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .service-card:hover::before { transform: scaleX(1); }
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0,126,167,0.12);
          border-color: #9AD1D4;
        }
        .service-card.active {
          background: linear-gradient(135deg, #003249, #007EA7);
          color: white;
          border-color: transparent;
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 60px rgba(0,50,73,0.25);
        }
        .service-card.active::before { transform: scaleX(0); }

        .cta-btn {
          background: linear-gradient(135deg, #007EA7, #003249);
          color: white;
          border: none;
          padding: 16px 40px;
          border-radius: 60px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.3px;
          position: relative;
          overflow: hidden;
        }
        .cta-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(0,126,167,0.35);
        }

        .cta-btn-outline {
          background: transparent;
          color: white;
          border: 2px solid rgba(255,255,255,0.5);
          padding: 14px 36px;
          border-radius: 60px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .cta-btn-outline:hover {
          background: rgba(255,255,255,0.1);
          border-color: white;
        }

        .section-tag {
          display: inline-block;
          background: linear-gradient(135deg, rgba(0,126,167,0.1), rgba(128,206,215,0.15));
          color: #007EA7;
          padding: 8px 20px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .diamond {
          width: 6px; height: 6px;
          background: #80CED7;
          transform: rotate(45deg);
          display: inline-block;
          margin: 0 12px;
          vertical-align: middle;
        }

        .hero-pattern {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 20% 50%, rgba(128,206,215,0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(154,209,212,0.1) 0%, transparent 40%),
            radial-gradient(circle at 60% 80%, rgba(0,126,167,0.08) 0%, transparent 40%);
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .nav-link {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: color 0.3s;
          cursor: pointer;
          background: none;
          border: none;
          font-family: 'DM Sans', sans-serif;
        }
        .nav-link:hover { color: #80CED7; }

        .about-value {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          margin-bottom: 28px;
        }
        .about-icon {
          min-width: 48px; height: 48px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(0,126,167,0.08), rgba(128,206,215,0.12));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          border: 1px solid rgba(0,126,167,0.1);
          transition: all 0.3s ease;
        }
        .about-value:hover .about-icon {
          background: linear-gradient(135deg, #007EA7, #80CED7);
          border-color: transparent;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-toggle { display: none !important; }
          .mobile-menu-overlay { display: none !important; }
        }
      `}</style>

      {/* Navigation */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`} style={{ background: scrolled ? undefined : "transparent" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: "linear-gradient(135deg, #80CED7, #007EA7)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "white", fontSize: 18, fontFamily: "'Playfair Display', serif" }}>C</div>
            <span style={{ color: "white", fontWeight: 700, fontSize: 18, fontFamily: "'Playfair Display', serif" }}>conciergerie solutions</span>
          </div>
          <div className="desktop-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <a className="nav-link" href="#prestations">Prestations</a>
            <a className="nav-link" href="#apropos">À propos</a>
            <button className="cta-btn" style={{ padding: "10px 28px", fontSize: 14 }}>Nous contacter</button>
          </div>
          <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} style={{ background: "none", border: "none", cursor: "pointer", display: "none", flexDirection: "column", gap: 5 }}>
            <span style={{ width: 24, height: 2, background: "white", borderRadius: 2, transition: "all 0.3s", transform: mobileMenu ? "rotate(45deg) translateY(7px)" : "none" }} />
            <span style={{ width: 24, height: 2, background: "white", borderRadius: 2, transition: "all 0.3s", opacity: mobileMenu ? 0 : 1 }} />
            <span style={{ width: 24, height: 2, background: "white", borderRadius: 2, transition: "all 0.3s", transform: mobileMenu ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="mobile-menu-overlay" style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(0,50,73,0.97)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32, animation: "fadeIn 0.3s ease" }}>
          <a href="#prestations" onClick={() => setMobileMenu(false)} style={{ color: "white", textDecoration: "none", fontSize: 24, fontFamily: "'Playfair Display', serif" }}>Prestations</a>
          <a href="#apropos" onClick={() => setMobileMenu(false)} style={{ color: "white", textDecoration: "none", fontSize: 24, fontFamily: "'Playfair Display', serif" }}>À propos</a>
          <button className="cta-btn" onClick={() => setMobileMenu(false)}>Nous contacter</button>
        </div>
      )}

      {/* ACCUEIL */}
      <section style={{ background: "linear-gradient(160deg, #003249 0%, #004a6e 40%, #007EA7 100%)", minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div className="hero-pattern" />
        <div className="grid-overlay" />
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 300, height: 300, borderRadius: "50%", border: "1px solid rgba(128,206,215,0.1)", animation: "float 6s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "8%", width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(128,206,215,0.08)", animation: "float 8s ease-in-out infinite 1s" }} />
        <div style={{ position: "absolute", top: "40%", right: "15%", width: 120, height: 120, borderRadius: "50%", background: "rgba(128,206,215,0.05)", animation: "float 7s ease-in-out infinite 0.5s" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px", position: "relative", zIndex: 2, width: "100%" }}>
          <div style={{ maxWidth: 680, opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.8s ease forwards" : "none" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(128,206,215,0.15)", borderRadius: 30, padding: "8px 20px", marginBottom: 28, border: "1px solid rgba(128,206,215,0.2)" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#80CED7" }} />
              <span style={{ color: "#9AD1D4", fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Votre quotidien simplifié</span>
            </div>

            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: 24 }}>
              L'art de vous<br />
              <span style={{ color: "#80CED7", fontStyle: "italic" }}>faciliter</span> la vie
            </h1>

            <p style={{ color: "rgba(204,219,220,0.85)", fontSize: 18, lineHeight: 1.7, maxWidth: 520, marginBottom: 44 }}>
              Des services de conciergerie sur-mesure, pensés pour répondre à chacun de vos besoins au quotidien avec soin et attention.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="#prestations" style={{ textDecoration: "none" }}>
                <button className="cta-btn" style={{ fontSize: 16, padding: "18px 44px" }}>Découvrir nos prestations</button>
              </a>
              <a href="#apropos" style={{ textDecoration: "none" }}>
                <button className="cta-btn-outline">Qui sommes-nous ?</button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PRESTATIONS */}
      <section id="prestations" style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="section-tag">Nos prestations</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, marginBottom: 16, color: "#003249" }}>
            Tout ce dont vous avez <span style={{ color: "#007EA7", fontStyle: "italic" }}>besoin</span>
          </h2>
          <p style={{ color: "#6b8a8e", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            Sept catégories de services conçues pour couvrir tous les aspects de votre vie quotidienne.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {services.map((s, i) => (
            <div key={i} className={`service-card ${activeService === i ? "active" : ""}`} onClick={() => setActiveService(activeService === i ? null : i)}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, marginBottom: 10, color: activeService === i ? "white" : "#003249" }}>{s.name}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: activeService === i ? "rgba(255,255,255,0.8)" : "#7a9a9e" }}>{s.desc}</p>
              <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 8, color: activeService === i ? "#80CED7" : "#007EA7", fontSize: 14, fontWeight: 600 }}>
                En savoir plus
                <span style={{ transition: "transform 0.3s", display: "inline-block", transform: activeService === i ? "translateX(4px)" : "none" }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* À PROPOS */}
      <section id="apropos" style={{ background: "linear-gradient(160deg, #003249, #004a6e)", padding: "100px 24px", position: "relative", overflow: "hidden" }}>
        <div className="grid-overlay" />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 60, alignItems: "center" }}>
            <div>
              <div className="section-tag" style={{ background: "rgba(128,206,215,0.15)", color: "#80CED7" }}>À propos</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 700, color: "white", marginBottom: 24, lineHeight: 1.2 }}>
                Une approche<br /><span style={{ color: "#80CED7", fontStyle: "italic" }}>humaine</span> et personnalisée
              </h2>
              <p style={{ color: "rgba(204,219,220,0.7)", lineHeight: 1.8, marginBottom: 36, fontSize: 16 }}>
                Conciergerie Solutions est née d'une conviction simple : tout le monde mérite un coup de main au quotidien. Que ce soit pour vos courses, votre ménage, vos enfants ou vos démarches administratives, je mets un point d'honneur à vous offrir un accompagnement attentif, fiable et chaleureux.
              </p>

              {[
                { icon: "🤝", title: "Écoute attentive", desc: "Chaque demande est unique, je prends le temps de comprendre vos besoins" },
                { icon: "⚡", title: "Réactivité", desc: "Une réponse rapide et un suivi personnalisé pour chaque mission" },
                { icon: "🔒", title: "Confiance", desc: "Transparence, sérieux et respect de votre vie privée" },
              ].map((item, i) => (
                <div key={i} className="about-value">
                  <div className="about-icon">{item.icon}</div>
                  <div>
                    <div style={{ color: "white", fontWeight: 600, marginBottom: 4, fontSize: 16 }}>{item.title}</div>
                    <div style={{ color: "rgba(204,219,220,0.6)", fontSize: 14, lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "linear-gradient(135deg, #007EA7, #80CED7)", borderRadius: 24, padding: "48px 36px", color: "#003249" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>💬</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Ma promesse</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.85 }}>Un service sur-mesure, à votre écoute, où chaque détail compte. Votre sérénité est ma priorité.</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 20, padding: "32px 24px", border: "1px solid rgba(128,206,215,0.12)", textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>📍</div>
                  <div style={{ color: "white", fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Proximité</div>
                  <div style={{ color: "rgba(204,219,220,0.5)", fontSize: 13 }}>Service local et réactif</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 20, padding: "32px 24px", border: "1px solid rgba(128,206,215,0.12)", textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>🕐</div>
                  <div style={{ color: "white", fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Flexibilité</div>
                  <div style={{ color: "rgba(204,219,220,0.5)", fontSize: 13 }}>Adapté à votre emploi du temps</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA CONTACT */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", background: "linear-gradient(160deg, #003249, #007EA7)", borderRadius: 28, padding: "64px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div className="grid-overlay" />
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, color: "white", marginBottom: 16 }}>Envie d'en savoir plus ?</h2>
            <p style={{ color: "rgba(204,219,220,0.7)", marginBottom: 36, maxWidth: 460, margin: "0 auto 36px", lineHeight: 1.7, fontSize: 16 }}>
              N'hésitez pas à me contacter pour discuter de vos besoins. Premier échange gratuit et sans engagement.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="cta-btn" style={{ background: "white", color: "#003249" }}>Me contacter</button>
              <button className="cta-btn-outline">01 23 45 67 89</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#003249", padding: "48px 24px 28px", color: "rgba(204,219,220,0.5)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #80CED7, #007EA7)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "white", fontSize: 16, fontFamily: "'Playfair Display', serif" }}>C</div>
                <span style={{ color: "white", fontWeight: 700, fontSize: 16, fontFamily: "'Playfair Display', serif" }}>conciergerie solutions</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7 }}>Votre partenaire de confiance pour une vie plus sereine.</p>
            </div>
            <div>
              <div style={{ color: "white", fontWeight: 600, marginBottom: 16, fontSize: 14, textTransform: "uppercase", letterSpacing: 1 }}>Prestations</div>
              {services.map((s, i) => (
                <div key={i} style={{ marginBottom: 8, fontSize: 14, cursor: "pointer" }}>{s.name}</div>
              ))}
            </div>
            <div>
              <div style={{ color: "white", fontWeight: 600, marginBottom: 16, fontSize: 14, textTransform: "uppercase", letterSpacing: 1 }}>Contact</div>
              <div style={{ marginBottom: 8, fontSize: 14 }}>📞 01 23 45 67 89</div>
              <div style={{ fontSize: 14 }}>✉️ contact@conciergerie-solutions.fr</div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(128,206,215,0.1)", paddingTop: 20, textAlign: "center", fontSize: 13 }}>
            © 2026 conciergerie solutions <span className="diamond" /> Tous droits réservés
          </div>
        </div>
      </footer>
    </div>
  );
}
