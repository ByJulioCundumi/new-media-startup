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

  const actividadUltimos7Dias = [
  {
    fecha: "2025-12-11",
    logins: 1620,
    cuentas: 210,
    cvsCreados: 540,
    cvsActualizados: 980,
    recuperaciones: 44,
    solicitudesComision: 9,
  },
  {
    fecha: "2025-12-12",
    logins: 1710,
    cuentas: 235,
    cvsCreados: 590,
    cvsActualizados: 1020,
    recuperaciones: 51,
    solicitudesComision: 13,
  },
  {
    fecha: "2025-12-13",
    logins: 1580,
    cuentas: 198,
    cvsCreados: 510,
    cvsActualizados: 940,
    recuperaciones: 39,
    solicitudesComision: 7,
  },
  {
    fecha: "2025-12-14",
    logins: 1660,
    cuentas: 225,
    cvsCreados: 560,
    cvsActualizados: 990,
    recuperaciones: 47,
    solicitudesComision: 11,
  },
  {
    fecha: "2025-12-15",
    logins: 1740,
    cuentas: 248,
    cvsCreados: 610,
    cvsActualizados: 1080,
    recuperaciones: 56,
    solicitudesComision: 14,
  },
  {
    fecha: "2025-12-16",
    logins: 1810,
    cuentas: 260,
    cvsCreados: 640,
    cvsActualizados: 1150,
    recuperaciones: 61,
    solicitudesComision: 18,
  },
  {
    fecha: "2025-12-17",
    logins: 1840,
    cuentas: 270,
    cvsCreados: 620,
    cvsActualizados: 1310,
    recuperaciones: 58,
    solicitudesComision: 15,
  },
];


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

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--info">
            <span className="admin-dashboard__metric-label">
              Cuentas Creadas (hoy)
            </span>
            <strong className="admin-dashboard__metric-value">
              {metrics.actividadDiaria.iniciosSesion.toLocaleString()}
            </strong>
          </article>

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--warning-soft">
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

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--neutral">
            <span className="admin-dashboard__metric-label">
              Recuperacion de contraseñas (hoy)
            </span>
            <strong className="admin-dashboard__metric-value">
              {metrics.actividadDiaria.cvsActualizados.toLocaleString()}
            </strong>
          </article>

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--neutral">
            <span className="admin-dashboard__metric-label">
              Solicitudes de comision +50% (hoy)
            </span>
            <strong className="admin-dashboard__metric-value">
              {metrics.actividadDiaria.cvsActualizados.toLocaleString()}
            </strong>
          </article>
        </div>
      </section>

      {/* SOLICITUDES */}
      <section className="admin-dashboard__section">
        <h2 className="admin-dashboard__section-title">Incremento de comision +50%</h2>

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

      {/* TABLA ACTIVIDAD 7 DÍAS */}
      <section className="admin-dashboard__section">
        <h2 className="admin-dashboard__section-title">
          Actividad de los últimos 7 días
        </h2>

        <div className="admin-dashboard__table-wrapper">
          <table className="admin-dashboard__table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th className="num">Logins</th>
                <th className="num">Cuentas</th>
                <th className="num">CVs creados</th>
                <th className="num">CVs actualizados</th>
                <th className="num">Recuperaciones</th>
                <th className="num">Solicitudes comisión</th>
              </tr>
            </thead>

            <tbody>
              {actividadUltimos7Dias.map((dia) => (
                <tr key={dia.fecha}>
                  <td className="date">{dia.fecha}</td>

                  <td className="num">{dia.logins.toLocaleString()}</td>
                  <td className="num">{dia.cuentas}</td>
                  <td className="num">{dia.cvsCreados}</td>
                  <td className="num">{dia.cvsActualizados}</td>
                  <td className="num">{dia.recuperaciones}</td>

                  <td className="num">
                    <span className="badge badge--warning">
                      {dia.solicitudesComision}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </section>
  );
}

export default AdminDashboard;
