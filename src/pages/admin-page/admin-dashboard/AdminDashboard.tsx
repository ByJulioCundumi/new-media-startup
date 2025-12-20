import { useEffect, useState } from "react";
import "./admindashboard.scss";
import {
  getTodayStatsApi,
  getLast7DaysStatsApi,
  getGeneralMetricsApi,
} from "../../../api/admin";

interface GeneralMetrics {
  users: {
    totalRegistered: number;
    onlineNow: number;
    activeLast30Days: number;
  };
  subscriptions: {
    planGratuito: number;
    planMensual: number;
    planAnual: number;
  };
  commissions: {
    totalRequests: number;
    approvedRequests: number;
  };
}

interface TodayStats {
  date: string;
  logins: number;
  signups: number;
  cvsCreated: number;
  cvsUpdated: number;
  passwordResetsRequested: number;
  commissionRequests: number;
}

interface DayActivity {
  date: string;
  logins: number;
  signups: number;
  cvsCreated: number;
  cvsUpdated: number;
  passwordResetsRequested: number;
  commissionRequests: number;
}

function AdminDashboard() {
  const [general, setGeneral] = useState<GeneralMetrics | null>(null);
  const [todayStats, setTodayStats] = useState<TodayStats | null>(null);
  const [last7Days, setLast7Days] = useState<DayActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [generalData, todayData, last7Data] = await Promise.all([
          getGeneralMetricsApi(),
          getTodayStatsApi(),
          getLast7DaysStatsApi(),
        ]);

        setGeneral(generalData);
        setTodayStats(todayData);
        setLast7Days(last7Data);
      } catch (err: any) {
        setError(err.message || "Error cargando el dashboard");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <section className="admin-dashboard"><p>Cargando dashboard...</p></section>;
  if (error) return <section className="admin-dashboard"><p className="error">⚠️ {error}</p></section>;
  if (!general || !todayStats) return <section className="admin-dashboard"><p>No hay datos disponibles</p></section>;

  return (
    <section className="admin-dashboard">
      {/* USUARIOS */}
      <section className="admin-dashboard__section">
        <h2 className="admin-dashboard__section-title">Usuarios</h2>
        <div className="admin-dashboard__grid">
          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--info">
            <span className="admin-dashboard__metric-label">Usuarios registrados</span>
            <strong className="admin-dashboard__metric-value">
              {general.users.totalRegistered.toLocaleString()}
            </strong>
          </article>

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--success">
            <span className="admin-dashboard__metric-label">Seciones Abiertas (ahora)</span>
            <strong className="admin-dashboard__metric-value">
              {general.users.onlineNow}
            </strong>
          </article>

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--success-soft">
            <span className="admin-dashboard__metric-label">Usuarios activos (últimos 30 días)</span>
            <strong className="admin-dashboard__metric-value">
              {general.users.activeLast30Days.toLocaleString()}
            </strong>
          </article>
        </div>
      </section>

      {/* SUSCRIPCIONES */}
      <section className="admin-dashboard__section">
        <h2 className="admin-dashboard__section-title">Suscripciones</h2>
        <div className="admin-dashboard__grid">
          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--neutral">
            <span className="admin-dashboard__metric-label">Plan gratuito</span>
            <strong className="admin-dashboard__metric-value">
              {general.subscriptions.planGratuito.toLocaleString()}
            </strong>
          </article>

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--primary">
            <span className="admin-dashboard__metric-label">Plan mensual</span>
            <strong className="admin-dashboard__metric-value">
              {general.subscriptions.planMensual.toLocaleString()}
            </strong>
          </article>

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--primary-strong">
            <span className="admin-dashboard__metric-label">Plan anual</span>
            <strong className="admin-dashboard__metric-value">
              {general.subscriptions.planAnual.toLocaleString()}
            </strong>
          </article>
        </div>
      </section>

      {/* ACTIVIDAD DIARIA */}
      <section className="admin-dashboard__section">
        <h2 className="admin-dashboard__section-title">Actividad diaria</h2>
        <div className="admin-dashboard__grid">
          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--info">
            <span className="admin-dashboard__metric-label">Inicios de sesión (hoy)</span>
            <strong className="admin-dashboard__metric-value">
              {todayStats.logins.toLocaleString()}
            </strong>
          </article>

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--info">
            <span className="admin-dashboard__metric-label">Cuentas Creadas (hoy)</span>
            <strong className="admin-dashboard__metric-value">
              {todayStats.signups.toLocaleString()}
            </strong>
          </article>

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--warning-soft">
            <span className="admin-dashboard__metric-label">CVs creados (hoy)</span>
            <strong className="admin-dashboard__metric-value">
              {todayStats.cvsCreated.toLocaleString()}
            </strong>
          </article>

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--warning-soft">
            <span className="admin-dashboard__metric-label">CVs actualizados (hoy)</span>
            <strong className="admin-dashboard__metric-value">
              {todayStats.cvsUpdated.toLocaleString()}
            </strong>
          </article>

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--neutral">
            <span className="admin-dashboard__metric-label">Recuperación de contraseñas (hoy)</span>
            <strong className="admin-dashboard__metric-value">
              {todayStats.passwordResetsRequested.toLocaleString()}
            </strong>
          </article>

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--neutral">
            <span className="admin-dashboard__metric-label">Solicitudes de comisión +50% (hoy)</span>
            <strong className="admin-dashboard__metric-value">
              {todayStats.commissionRequests.toLocaleString()}
            </strong>
          </article>
        </div>
      </section>

      {/* SOLICITUDES DE COMISIÓN */}
      <section className="admin-dashboard__section">
        <h2 className="admin-dashboard__section-title">Incremento de comisión +50%</h2>
        <div className="admin-dashboard__grid admin-dashboard__grid--compact">
          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--warning">
            <span className="admin-dashboard__metric-label">Solicitudes Recibidas (totales)</span>
            <strong className="admin-dashboard__metric-value">
              {general.commissions.totalRequests}
            </strong>
          </article>

          <article className="admin-dashboard__metric-card admin-dashboard__metric-card--success-soft">
            <span className="admin-dashboard__metric-label">Solicitudes aceptadas</span>
            <strong className="admin-dashboard__metric-value">
              {general.commissions.approvedRequests}
            </strong>
          </article>
        </div>
      </section>

      {/* TABLA ACTIVIDAD 7 DÍAS */}
      <section className="admin-dashboard__section">
        <h2 className="admin-dashboard__section-title">Actividad de los últimos 7 días</h2>
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
              {last7Days.map((dia) => (
                <tr key={dia.date}>
                  <td className="date">{dia.date}</td>
                  <td className="num">{dia.logins.toLocaleString()}</td>
                  <td className="num">{dia.signups}</td>
                  <td className="num">{dia.cvsCreated}</td>
                  <td className="num">{dia.cvsUpdated}</td>
                  <td className="num">{dia.passwordResetsRequested}</td>
                  <td className="num">
                    <span className="badge badge--warning">
                      {dia.commissionRequests}
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