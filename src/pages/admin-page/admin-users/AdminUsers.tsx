import { useMemo, useState, useEffect } from "react";
import "./adminusers.scss";
import SearchBar from "../../../components/search-bar/SearchBar";
import {
  getUsersWithTodayActivityApi,
  getUserLast7DaysActivityApi,
  updateUserRestrictionsApi,
  logoutUserApi,
  verifyAdminPasswordApi,
} from "../../../api/admin";
import { hasValidSubscriptionTime } from "../../../util/checkSubscriptionTime";
import AdminSetUserCommissionButton from "../admin-commission-request/set-user-commission/AdminSetUserCommissionButton";

/* ===================== TYPES ===================== */

interface Restrictions {
  loginsPerDay: boolean;
  passwordRecoveriesPerDay: boolean;
}

interface DailyMetrics {
  date: string;
  loginsPerDay: number;
  cvsCreatedPerDay: number;
  cvsUpdatedPerDay: number;
  passwordRecoveriesPerDay: number;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  plan: "Gratuito" | "Mensual" | "Anual";
  isLoggedIn: boolean;
  affiliateCommission: number;
  subscriptionExpiresAt: string;
  metrics: {
    loginsPerDay: number;
    cvsCreatedPerDay: number;
    cvsUpdatedPerDay: number;
    passwordRecoveriesPerDay: number;
  };
  restrictions: Restrictions;
  history: DailyMetrics[];
}

/* ===================== COMPONENT ===================== */

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [showRestrictedOnly, setShowRestrictedOnly] = useState(false);
  const [planFilter, setPlanFilter] = useState<"Todos" | AdminUser["plan"]>("Todos");

  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [pendingLogoutUserId, setPendingLogoutUserId] = useState<string | null>(null);

  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordPopupAction, setPasswordPopupAction] = useState<"edit" | "logout" | "save">("edit");

  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [loadingHistory, setLoadingHistory] = useState(false);

  /* ===================== CARGA INICIAL ===================== */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUsersWithTodayActivityApi();

        const mappedUsers: AdminUser[] = data.map((u: any) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          plan: u.plan,
          isLoggedIn: u.isLoggedIn,
          metrics: u.metrics,
          restrictions: u.restrictions,
          history: [],
          affiliateCommission: u.affiliateCommission,
          subscriptionExpiresAt: u.subscriptionExpiresAt
        }));

        setUsers(mappedUsers);
      } catch (err: any) {
        setError(err.message || "Error cargando usuarios");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /* ===================== FILTRADO ===================== */
  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const hasRestrictions = Object.values(u.restrictions).some(Boolean);
      const matchesRestricted = showRestrictedOnly ? hasRestrictions : true;
      const matchesPlan = planFilter === "Todos" ? true : u.plan === planFilter;
      return matchesSearch && matchesRestricted && matchesPlan;
    });
  }, [users, search, showRestrictedOnly, planFilter]);

  /* ===================== HISTORIAL ===================== */
  const openHistory = async (user: AdminUser) => {
    try {
      setLoadingHistory(true);
      setShowHistoryPopup(true);
      setSelectedUser({ ...user, history: [] });

      const data = await getUserLast7DaysActivityApi(user.id);

      const history: DailyMetrics[] = data.history.map((d: any) => {
        const [year, month, day] = d.date.split("-");
        return {
          date: `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`,
          loginsPerDay: d.loginsPerDay,
          cvsCreatedPerDay: d.cvsCreatedPerDay,
          cvsUpdatedPerDay: d.cvsUpdatedPerDay,
          passwordRecoveriesPerDay: d.passwordRecoveriesPerDay,
        };
      });

      setSelectedUser((prev) => (prev?.id === user.id ? { ...prev, history } : prev));
    } catch (err: any) {
      alert("Error cargando historial: " + err.message);
    } finally {
      setLoadingHistory(false);
    }
  };

  /* ===================== EDICIÓN Y RESTRICCIONES ===================== */
  const startEditing = (userId: string) => {
    setEditingUserId(userId);
    setPasswordPopupAction("edit");
    setShowPasswordPopup(true);
  };

  const cancelEditing = () => {
    setEditingUserId(null);
    // Restaurar restricciones originales (opcional: podrías guardar una copia antes de editar)
  };

  const updateLocalRestriction = (userId: string, field: keyof Restrictions, value: boolean) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, restrictions: { ...u.restrictions, [field]: value } }
          : u
      )
    );
  };

  const saveRestrictions = async (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    try {
      await updateUserRestrictionsApi(userId, {
        loginsPerDay: user.restrictions.loginsPerDay,
        passwordRecoveriesPerDay: user.restrictions.passwordRecoveriesPerDay,
      });
      // Si todo bien, simplemente salimos del modo edición
      setEditingUserId(null);
    } catch (err) {
      alert("Error guardando restricciones");
      // Opcional: revertir cambios locales
    }
  };

  /* ===================== CERRAR SESIÓN ===================== */
  const requestLogout = (userId: string) => {
    setPendingLogoutUserId(userId);
    setPasswordPopupAction("logout");
    setShowPasswordPopup(true);
  };

  const executeLogout = async () => {
    if (!pendingLogoutUserId) return;
    try {
      await logoutUserApi(pendingLogoutUserId);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === pendingLogoutUserId ? { ...u, isLoggedIn: false } : u
        )
      );
    } catch (err) {
      alert("Error cerrando sesión");
    }
  };

  /* ===================== VALIDACIÓN DE CONTRASEÑA ===================== */
  const handlePasswordConfirm = async () => {
    try {
      setPasswordError(false);
      await verifyAdminPasswordApi(password);

      if (passwordPopupAction === "edit") {
        // Solo habilitamos edición
        setShowPasswordPopup(false);
        setPassword("");
      } else if (passwordPopupAction === "logout") {
        await executeLogout();
        setShowPasswordPopup(false);
        setPendingLogoutUserId(null);
        setPassword("");
      } else if (passwordPopupAction === "save") {
        const userId = editingUserId;
        if (userId) await saveRestrictions(userId);
        setShowPasswordPopup(false);
        setPassword("");
      }
    } catch (err) {
      setPasswordError(true);
    }
  };

  const requestSaveWithPassword = (userId: string) => {
    setPasswordPopupAction("save");
    setShowPasswordPopup(true);
  };

  /* ===================== RENDER ===================== */
  if (loading) return <div className="admin-users"><div style={{padding: "3rem", textAlign: "center"}}>Cargando usuarios...</div></div>;
  if (error) return <div className="admin-users"><div style={{padding: "3rem", textAlign: "center", color: "red"}}>{error}</div></div>;

  return (
    <section className="admin-users">
      {/* HEADER */}
      <header className="admin-users__header">
        <div>
          <h2 className="admin-users__title">Gestión de usuarios</h2>
          <span className="admin-users__total">Total: {filteredUsers.length}</span>
        </div>

        <div className="admin-users__controls">
          <label className="admin-users__checkbox">
            <input
              type="checkbox"
              checked={showRestrictedOnly}
              onChange={() => setShowRestrictedOnly(!showRestrictedOnly)}
            />
            Restringidos
          </label>

          <SearchBar textHolder="Buscar por nombre o email" value={search} onChange={setSearch} />

          <select className="admin-users__select" value={planFilter} onChange={(e) => setPlanFilter(e.target.value as typeof planFilter)}>
            <option value="Todos">Todos</option>
            <option value="Gratuito">Gratuito</option>
            <option value="Mensual">Mensual</option>
            <option value="Anual">Anual</option>
          </select>
        </div>
      </header>

      {/* CARDS */}
      <div className="admin-users__grid">
        {filteredUsers.map((user) => {
          const isEditing = editingUserId === user.id;

          return (
            <div key={user.id} className="admin-users__card">
              <div className="admin-users__identity">
                <div>
                  <span className="admin-users__name">{user.name}</span>
                  <span className="admin-users__email">{user.email}</span>
                </div>
                <span className={`admin-users__plan admin-users__plan--${user.plan.toLowerCase().replace("á", "a")}`}>
                  {user.plan}: {hasValidSubscriptionTime(user.subscriptionExpiresAt) ? "Activo" : "Inactivo"} / {user.affiliateCommission}%
                </span>
              </div>

              <div className="admin-users__metrics">
                <div className="admin-users__metric">
                  <div><span className="admin-users__metric-label">Logins hoy</span></div>
                  <span className="admin-users__metric-value">{user.metrics.loginsPerDay}</span>
                </div>
                <div className="admin-users__metric">
                  <div><span className="admin-users__metric-label">CVs creados hoy</span></div>
                  <span className="admin-users__metric-value">{user.metrics.cvsCreatedPerDay}</span>
                </div>
                <div className="admin-users__metric">
                  <div><span className="admin-users__metric-label">CVs editados hoy</span></div>
                  <span className="admin-users__metric-value">{user.metrics.cvsUpdatedPerDay}</span>
                </div>
                <div className="admin-users__metric">
                  <div><span className="admin-users__metric-label">Recuperaciones hoy</span></div>
                  <span className="admin-users__metric-value">{user.metrics.passwordRecoveriesPerDay}</span>
                </div>

                {/* Switches */}
                <div className={`admin-users__metric ${user.restrictions.loginsPerDay ? "admin-users__metric--restricted" : ""} ${!isEditing ? "admin-users__metric--disabled" : ""}`}>
                  <div><span className="admin-users__metric-label">Limitar logins</span></div>
                  <label className="admin-users__switch">
                    <input
                      type="checkbox"
                      disabled={!isEditing}
                      checked={user.restrictions.loginsPerDay}
                      onChange={(e) => {
                        updateLocalRestriction(user.id, "loginsPerDay", e.target.checked);
                      }}
                    />
                    <span className="admin-users__slider" />
                  </label>
                </div>

                <div className={`admin-users__metric ${user.restrictions.passwordRecoveriesPerDay ? "admin-users__metric--restricted" : ""} ${!isEditing ? "admin-users__metric--disabled" : ""}`}>
                  <div><span className="admin-users__metric-label">Limitar recuperaciones</span></div>
                  <label className="admin-users__switch">
                    <input
                      type="checkbox"
                      disabled={!isEditing}
                      checked={user.restrictions.passwordRecoveriesPerDay}
                      onChange={(e) => {
                        updateLocalRestriction(user.id, "passwordRecoveriesPerDay", e.target.checked);
                      }}
                    />
                    <span className="admin-users__slider" />
                  </label>
                </div>
              </div>

              <div className="admin-users__footer">
                <div className="admin-users__actions">
                  {user.isLoggedIn && (
                    <button className="admin-users__btn admin-users__btn--danger" onClick={() => requestLogout(user.id)}>
                      Cerrar sesión
                    </button>
                  )}

                  <button className="admin-users__btn admin-users__btn--secondary" onClick={() => openHistory(user)}>
                    Ver historial
                  </button>

                  {isEditing ? (
                    <>
                      <button className="admin-users__btn admin-users__btn--secondary" onClick={cancelEditing}>
                        Cancelar
                      </button>
                      <button className="admin-users__btn admin-users__btn--primary" onClick={() => requestSaveWithPassword(user.id)}>
                        Guardar cambios
                      </button>
                    </>
                  ) : (
                    <button className="admin-users__btn admin-users__btn--primary" onClick={() => startEditing(user.id)}>
                      Habilitar edición
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PASSWORD POPUP */}
      {showPasswordPopup && (
        <div className="admin-users__overlay">
          <div className="admin-users__popup admin-users__popup--auth">
            <h3>Validación de administrador</h3>
            <p style={{fontSize: "0.85rem", color: "#64748b", marginBottom: "1rem"}}>
              {passwordPopupAction === "edit" && "Para habilitar la edición de restricciones"}
              {passwordPopupAction === "logout" && "Para cerrar la sesión del usuario"}
              {passwordPopupAction === "save" && "Para guardar los cambios en las restricciones"}
            </p>

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }}
              className={`admin-users__input ${passwordError ? "admin-users__input--error" : ""}`}
              onKeyDown={(e) => e.key === "Enter" && handlePasswordConfirm()}
            />

            {passwordError && <div className="admin-users__error-box">Contraseña incorrecta</div>}

            <div className="admin-users__popup-actions">
              <button
                className="admin-users__btn admin-users__btn--secondary"
                onClick={() => {
                  setShowPasswordPopup(false);
                  setPassword("");
                  setPasswordError(false);
                  setPendingLogoutUserId(null);
                  setPasswordPopupAction("edit");
                }}
              >
                Cancelar
              </button>
              <button className="admin-users__btn admin-users__btn--primary" onClick={handlePasswordConfirm}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HISTORY POPUP */}
      {showHistoryPopup && selectedUser && (
        <div className="admin-users__overlay">
          <div className="admin-users__popup admin-users__popup--history">
            <h3>Historial · {selectedUser.name}</h3>

            {loadingHistory ? (
              <div style={{padding: "2rem", textAlign: "center"}}>Cargando historial...</div>
            ) : (
              <table className="admin-users__history-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Logins</th>
                    <th>CVs creados</th>
                    <th>CVs editados</th>
                    <th>Recuperaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedUser.history.map((day) => (
                    <tr key={day.date}>
                      <td>{day.date}</td>
                      <td>{day.loginsPerDay}</td>
                      <td>{day.cvsCreatedPerDay}</td>
                      <td>{day.cvsUpdatedPerDay}</td>
                      <td>{day.passwordRecoveriesPerDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="admin-users__popup-actions">
              <button className="admin-users__btn admin-users__btn--secondary" onClick={() => {
                setShowHistoryPopup(false);
                setSelectedUser(null);
              }}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <AdminSetUserCommissionButton />
    </section>
  );
}