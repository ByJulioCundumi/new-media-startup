import "./footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LOGO + DESCRIPCIÓN */}
        <div className="footer-brand">
          <h2 className="footer-logo">CV Remoto</h2>
          <p className="footer-desc">
            Crea un CV profesional en minutos con plantillas modernas,
            descarga instantánea y herramientas avanzadas.
          </p>
        </div>

        {/* SECCIONES */}
        <div className="footer-links">

          <div className="footer-column">
            <h4>Producto</h4>
            <a>Crear CV</a>
            <a>Plantillas</a>
            <a>Afiliados</a>
          </div>

          <div className="footer-column">
            <h4>Compañía</h4>
            <a>Nosotros</a>
            <a>Contacto</a>
            <a>Precios</a>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <a>Términos</a>
            <a>Privacidad</a>
            <a>Cookies</a>
          </div>

        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CV Remoto — Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
