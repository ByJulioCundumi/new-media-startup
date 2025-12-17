import "./admindashboard.scss";

function AdminDashboard() {
  const metrics = {
    usuarios: {
      totalRegistrados: 12450,
      enLinea: 342,
      activosUltimos30Dias: 8920,
    },
    suscripciones: {
      planGratuito: 6100,
      planMensual: 4200,
      planAnual: 2150,
    },
    actividadDiaria: {
      iniciosSesion: 1840,
      cvsCreados: 620,
      cvsActualizados: 1310,
    },
    operaciones: {
      solicitudesIncrementoComision: 87,
      solicitudesAceptadas: 42,
    },
  };

  return (
    <section className="admin-dashboard">

      {/* USUARIOS */}
      <section className="admin-dashboard__section">
        <h2 className="admin-dashboard__section-title">Usuarios</h2>

        <div className="admin-dashboard__grid">
          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--info">
            <span className="admin-dashboard__metric-label">
              Usuarios registrados
            </span>
            <strong className="admin-dashboard__metric-value">
              {metrics.usuarios.totalRegistrados.toLocaleString()}
            </strong>
          </article>

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--success">
            <span className="admin-dashboard__metric-label">
              Usuarios en línea (ahora)
            </span>
            <strong className="admin-dashboard__metric-value">
              {metrics.usuarios.enLinea}
            </strong>
          </article>

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--success-soft">
            <span className="admin-dashboard__metric-label">
              Usuarios activos (últimos 30 días)
            </span>
            <strong className="admin-dashboard__metric-value">
              {metrics.usuarios.activosUltimos30Dias.toLocaleString()}
            </strong>
          </article>

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--success-bad">
            <span className="admin-dashboard__metric-label">
              Usuarios Restringidos
            </span>
            <strong className="admin-dashboard__metric-value">
              {metrics.usuarios.activosUltimos30Dias.toLocaleString()}
            </strong>
          </article>
        </div>
      </section>

      {/* SUSCRIPCIONES */}
      <section className="admin-dashboard__section">
        <h2 className="admin-dashboard__section-title">Suscripciones</h2>

        <div className="admin-dashboard__grid">
          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--neutral">
            <span className="admin-dashboard__metric-label">
              Plan gratuito
            </span>
            <strong className="admin-dashboard__metric-value">
              {metrics.suscripciones.planGratuito.toLocaleString()}
            </strong>
          </article>

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--primary">
            <span className="admin-dashboard__metric-label">
              Plan mensual
            </span>
            <strong className="admin-dashboard__metric-value">
              {metrics.suscripciones.planMensual.toLocaleString()}
            </strong>
          </article>

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--primary-strong">
            <span className="admin-dashboard__metric-label">
              Plan anual
            </span>
            <strong className="admin-dashboard__metric-value">
              {metrics.suscripciones.planAnual.toLocaleString()}
            </strong>
          </article>
        </div>
      </section>

      {/* ACTIVIDAD DIARIA */}
      <section className="admin-dashboard__section">
        <h2 className="admin-dashboard__section-title">Actividad diaria</h2>

        <div className="admin-dashboard__grid">
          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--info">
            <span className="admin-dashboard__metric-label">
              Inicios de sesión (hoy)
            </span>
            <strong className="admin-dashboard__metric-value">
              {metrics.actividadDiaria.iniciosSesion.toLocaleString()}
            </strong>
          </article>

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--success">
            <span className="admin-dashboard__metric-label">
              CVs creados (hoy)
            </span>
            <strong className="admin-dashboard__metric-value">
              {metrics.actividadDiaria.cvsCreados.toLocaleString()}
            </strong>
          </article>

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--warning-soft">
            <span className="admin-dashboard__metric-label">
              CVs actualizados (hoy)
            </span>
            <strong className="admin-dashboard__metric-value">
              {metrics.actividadDiaria.cvsActualizados.toLocaleString()}
            </strong>
          </article>

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--warning-soft">
            <span className="admin-dashboard__metric-label">
              Recuperacion de contraseñas (hoy)
            </span>
            <strong className="admin-dashboard__metric-value">
              {metrics.actividadDiaria.cvsActualizados.toLocaleString()}
            </strong>
          </article>
        </div>
      </section>

      {/* SOLICITUDES */}
      <section className="admin-dashboard__section">
        <h2 className="admin-dashboard__section-title">Incremento de comision</h2>

        <div className="admin-dashboard__grid admin-dashboard__grid--compact">
          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--warning">
            <span className="admin-dashboard__metric-label">
              Solicitudes Recibidas (totales)
            </span>
            <strong className="admin-dashboard__metric-value">
              {metrics.operaciones.solicitudesIncrementoComision}
            </strong>
          </article>

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--success-soft">
            <span className="admin-dashboard__metric-label">
              Solicitudes aceptadas
            </span>
            <strong className="admin-dashboard__metric-value">
              {metrics.operaciones.solicitudesAceptadas}
            </strong>
          </article>
        </div>
      </section>
    </section>
  );
}

export default AdminDashboard;
