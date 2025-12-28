import { useState, useEffect, useCallback } from "react";
import "./adminusers.scss";
import SearchBar from "../../../components/search-bar/SearchBar";
import {
  getUsersPaginatedApi,
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
  subscriptionExpiresAt: string | null;
  metrics: {
    loginsPerDay: number;
    cvsCreatedPerDay: number;
    cvsUpdatedPerDay: number;
    passwordRecoveriesPerDay: number;
  };
  restrictions: Restrictions;
}

/* ===================== COMPONENT ===================== */
export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [showRestrictedOnly, setShowRestrictedOnly] = useState(false);
  const [planFilter, setPlanFilter] = useState<"Todos" | AdminUser["plan"]>("Todos");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  // Usuario que estamos intentando editar (antes de autenticar)
  const [pendingEditUserId, setPendingEditUserId] = useState<string | null>(null);
  // Usuario que YA está autorizado para editar (después de contraseña correcta)
  const [authorizedEditUserId, setAuthorizedEditUserId] = useState<string | null>(null);

  const [pendingLogoutUserId, setPendingLogoutUserId] = useState<string | null>(null);

  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordPopupAction, setPasswordPopupAction] = useState<"edit" | "logout" | "save">("edit");

  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [loadingHistory, setLoadingHistory] = useState(false);

  /* ===================== DEBOUNCE ===================== */
  const useDebounced = (value: string, delay: number) => {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => setDebounced(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);
    return debounced;
  };

  const debouncedSearch = useDebounced(search, 500);

  /* ===================== CARGA DE USUARIOS ===================== */
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getUsersPaginatedApi({
        page,
        search: debouncedSearch || undefined,
        plan: planFilter,
        restrictedOnly: showRestrictedOnly,
        limit: 50,
      });

      setUsers(response.users);
      setTotalPages(response.pagination.totalPages);
      setTotalUsers(response.pagination.total);
    } catch (err: any) {
      setError(err.message || "Error cargando usuarios");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, planFilter, showRestrictedOnly]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, planFilter, showRestrictedOnly]);

  /* ===================== HISTORIAL ===================== */
  const openHistory = async (user: AdminUser) => {
    try {
      setLoadingHistory(true);
      setShowHistoryPopup(true);
      setSelectedUser({ ...user });

      const data = await getUserLast7DaysActivityApi(user.id);

      const history: DailyMetrics[] = data.history.map((d: any) => {
        const [year, month, day] = d.date.split("-");
        return {
          date: `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`,
          loginsPerDay: d.loginsPerDay,
          cvsCreatedPerDay: d.cvsCreatedPerDay,
          cvsUpdatedPerDay: d.cvsUpdatedPerDay,
          passwordRecoveriesPerDay: d.passwordRecoveriesPerDay,
        };
      });

      setSelectedUser(prev => prev?.id === user.id ? { ...prev, history } : prev);
    } catch (err: any) {
      alert("Error cargando historial: " + err.message);
    } finally {
      setLoadingHistory(false);
    }
  };

  /* ===================== RESTRICCIONES ===================== */
  const requestEdit = (userId: string) => {
    setPendingEditUserId(userId);
    setPasswordPopupAction("edit");
    setShowPasswordPopup(true);
  };

  const cancelEditing = () => {
    setAuthorizedEditUserId(null);
    setPendingEditUserId(null);
  };

  const updateLocalRestriction = (userId: string, field: keyof Restrictions, value: boolean) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === userId ? { ...u, restrictions: { ...u.restrictions, [field]: value } } : u
      )
    );
  };

  const saveRestrictions = async (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    try {
      await updateUserRestrictionsApi(userId, {
        loginsPerDay: user.restrictions.loginsPerDay,
        passwordRecoveriesPerDay: user.restrictions.passwordRecoveriesPerDay,
      });
      setAuthorizedEditUserId(null); // Salir del modo edición tras guardar
    } catch (err) {
      alert("Error guardando restricciones");
    }
  };

  /* ===================== LOGOUT ===================== */
  const requestLogout = (userId: string) => {
    setPendingLogoutUserId(userId);
    setPasswordPopupAction("logout");
    setShowPasswordPopup(true);
  };

  const executeLogout = async () => {
    if (!pendingLogoutUserId) return;
    try {
      await logoutUserApi(pendingLogoutUserId);
      setUsers(prev =>
        prev.map(u => (u.id === pendingLogoutUserId ? { ...u, isLoggedIn: false } : u))
      );
    } catch (err) {
      alert("Error cerrando sesión");
    }
  };

  /* ===================== PASSWORD POPUP ===================== */
  const handlePasswordConfirm = async () => {
    try {
      setPasswordError(false);
      await verifyAdminPasswordApi(password);

      if (passwordPopupAction === "edit") {
        // Autenticación exitosa → habilitar edición real
        if (pendingEditUserId) {
          setAuthorizedEditUserId(pendingEditUserId);
          setPendingEditUserId(null);
        }
        setShowPasswordPopup(false);

      } else if (passwordPopupAction === "logout") {
        await executeLogout();
        setShowPasswordPopup(false);
        setPendingLogoutUserId(null);

      } else if (passwordPopupAction === "save") {
        if (authorizedEditUserId) await saveRestrictions(authorizedEditUserId);
        setShowPasswordPopup(false);
      }

      setPassword("");
    } catch (err) {
      setPasswordError(true);
    }
  };

  const requestSaveWithPassword = () => {
    setPasswordPopupAction("save");
    setShowPasswordPopup(true);
  };

  /* ===================== RENDER ===================== */
  if (loading) return <div className="admin-users"><div style={{padding: "3rem", textAlign: "center"}}>Cargando usuarios...</div></div>;
  if (error) return <div className="admin-users"><div style={{padding: "3rem", textAlign: "center", color: "red"}}>{error}</div></div>;

  return (
    <section className="admin-users">
      <header className="admin-users__header">
        <div>
          <h2 className="admin-users__title">Gestión de usuarios</h2>
          <span className="admin-users__total">
            Total: {totalUsers} usuarios • Página {page} de {totalPages}
          </span>
        </div>

        <div className="admin-users__controls">
          <label className="admin-users__checkbox">
            <input
              type="checkbox"
              checked={showRestrictedOnly}
              onChange={() => setShowRestrictedOnly(!showRestrictedOnly)}
            />
            Solo restringidos
          </label>

          <SearchBar textHolder="Buscar por nombre o email" value={search} onChange={setSearch} />

          <select className="admin-users__select" value={planFilter} onChange={(e) => setPlanFilter(e.target.value as typeof planFilter)}>
            <option value="Todos">Todos los planes</option>
            <option value="Gratuito">Gratuito</option>
            <option value="Mensual">Mensual</option>
            <option value="Anual">Anual</option>
          </select>
        </div>
      </header>

      <div className="admin-users__grid">
        {users.map((user) => {
          const isAuthorizedToEdit = authorizedEditUserId === user.id;

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
                {/* Métricas */}
                <div className="admin-users__metric"><div><span className="admin-users__metric-label">Logins hoy</span></div><span className="admin-users__metric-value">{user.metrics.loginsPerDay}</span></div>
                <div className="admin-users__metric"><div><span className="admin-users__metric-label">CVs creados hoy</span></div><span className="admin-users__metric-value">{user.metrics.cvsCreatedPerDay}</span></div>
                <div className="admin-users__metric"><div><span className="admin-users__metric-label">CVs editados hoy</span></div><span className="admin-users__metric-value">{user.metrics.cvsUpdatedPerDay}</span></div>
                <div className="admin-users__metric"><div><span className="admin-users__metric-label">Recuperaciones hoy</span></div><span className="admin-users__metric-value">{user.metrics.passwordRecoveriesPerDay}</span></div>

                {/* Switches - solo editables si está autorizado */}
                <div className={`admin-users__metric ${user.restrictions.loginsPerDay ? "admin-users__metric--restricted" : ""} ${!isAuthorizedToEdit ? "admin-users__metric--disabled" : ""}`}>
                  <div><span className="admin-users__metric-label">Limitar logins</span></div>
                  <label className="admin-users__switch">
                    <input
                      type="checkbox"
                      disabled={!isAuthorizedToEdit}
                      checked={user.restrictions.loginsPerDay}
                      onChange={(e) => updateLocalRestriction(user.id, "loginsPerDay", e.target.checked)}
                    />
                    <span className="admin-users__slider" />
                  </label>
                </div>

                <div className={`admin-users__metric ${user.restrictions.passwordRecoveriesPerDay ? "admin-users__metric--restricted" : ""} ${!isAuthorizedToEdit ? "admin-users__metric--disabled" : ""}`}>
                  <div><span className="admin-users__metric-label">Limitar recuperaciones</span></div>
                  <label className="admin-users__switch">
                    <input
                      type="checkbox"
                      disabled={!isAuthorizedToEdit}
                      checked={user.restrictions.passwordRecoveriesPerDay}
                      onChange={(e) => updateLocalRestriction(user.id, "passwordRecoveriesPerDay", e.target.checked)}
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

                  {isAuthorizedToEdit ? (
                    <>
                      <button className="admin-users__btn admin-users__btn--secondary" onClick={cancelEditing}>
                        Cancelar
                      </button>
                      <button className="admin-users__btn admin-users__btn--primary" onClick={requestSaveWithPassword}>
                        Guardar cambios
                      </button>
                    </>
                  ) : (
                    <button className="admin-users__btn admin-users__btn--primary" onClick={() => requestEdit(user.id)}>
                      Habilitar edición
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINACIÓN */}
      {totalPages > 1 && (
        <div className="admin-users__pagination">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="admin-users__btn admin-users__btn--secondary">
            Anterior
          </button>
          <span className="admin-users__page-info">Página {page} de {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="admin-users__btn admin-users__btn--secondary">
            Siguiente
          </button>
        </div>
      )}

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
                  setPendingEditUserId(null);
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
                  <tr><th>Fecha</th><th>Logins</th><th>CVs creados</th><th>CVs editados</th><th>Recuperaciones</th></tr>
                </thead>
                <tbody>
                  {(selectedUser as any).history?.map((day: DailyMetrics) => (
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
              <button className="admin-users__btn admin-users__btn--secondary" onClick={() => { setShowHistoryPopup(false); setSelectedUser(null); }}>
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