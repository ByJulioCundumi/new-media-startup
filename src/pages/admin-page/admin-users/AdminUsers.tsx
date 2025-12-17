import { useMemo, useState } from "react";
import "./adminusers.scss";
import SearchBar from "../../../components/search-bar/SearchBar";

/* ===================== TYPES ===================== */

interface Restrictions {
  loginsPerDay: boolean;
  cvsCreatedPerDay: boolean;
  cvsUpdatedPerDay: boolean;
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
  metrics: Record<keyof Restrictions, number>;
  restrictions: Restrictions;
  history: DailyMetrics[];
}

type AdminAction = "edit" | "logout" | null;

/* ===================== MOCK ===================== */

const generateHistory = (): DailyMetrics[] =>
  Array.from({ length: 7 }).map((_, i) => ({
    date: `0${i + 1}/04/2026`,
    loginsPerDay: Math.floor(Math.random() * 4),
    cvsCreatedPerDay: Math.floor(Math.random() * 3),
    cvsUpdatedPerDay: Math.floor(Math.random() * 5),
    passwordRecoveriesPerDay: Math.floor(Math.random() * 2),
  }));

const mockUsers: AdminUser[] = [
  {
    id: "1",
    name: "Carlos Gómez",
    email: "carlos@email.com",
    plan: "Anual",
    isLoggedIn: true,
    metrics: {
      loginsPerDay: 3,
      cvsCreatedPerDay: 1,
      cvsUpdatedPerDay: 2,
      passwordRecoveriesPerDay: 0,
    },
    restrictions: {
      loginsPerDay: false,
      cvsCreatedPerDay: false,
      cvsUpdatedPerDay: false,
      passwordRecoveriesPerDay: false,
    },
    history: generateHistory(),
  },
  {
    id: "2",
    name: "Laura Martínez",
    email: "laura@email.com",
    plan: "Gratuito",
    isLoggedIn: false,
    metrics: {
      loginsPerDay: 0,
      cvsCreatedPerDay: 0,
      cvsUpdatedPerDay: 0,
      passwordRecoveriesPerDay: 1,
    },
    restrictions: {
      loginsPerDay: true,
      cvsCreatedPerDay: true,
      cvsUpdatedPerDay: true,
      passwordRecoveriesPerDay: false,
    },
    history: generateHistory(),
  },
];

/* ===================== COMPONENT ===================== */

export default function AdminUsers() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [showRestrictedOnly, setShowRestrictedOnly] = useState(false);
  const [planFilter, setPlanFilter] =
    useState<"Todos" | AdminUser["plan"]>("Todos");

  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<AdminAction>(null);

  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  /* ===================== FILTER ===================== */

  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase();

    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q);

      const hasRestrictions = Object.values(u.restrictions).some(Boolean);
      const matchesRestricted = showRestrictedOnly ? hasRestrictions : true;
      const matchesPlan =
        planFilter === "Todos" ? true : u.plan === planFilter;

      return matchesSearch && matchesRestricted && matchesPlan;
    });
  }, [users, search, showRestrictedOnly, planFilter]);

  /* ===================== HANDLERS ===================== */

  const toggleRestriction = (
    userId: string,
    field: keyof Restrictions,
    value: boolean
  ) => {
    if (editingUserId !== userId) return;

    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              restrictions: { ...u.restrictions, [field]: value },
            }
          : u
      )
    );
  };

  const validatePassword = () => {
    if (password !== "admin123") {
      setPasswordError(true);
      return;
    }

    // Logout protegido
    if (pendingAction === "logout" && editingUserId) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUserId ? { ...u, isLoggedIn: false } : u
        )
      );
      setEditingUserId(null);
    }

    // Para "edit" NO se limpia editingUserId
    setShowPasswordPopup(false);
    setPendingAction(null);
    setPassword("");
    setPasswordError(false);
  };

  /* ===================== RENDER ===================== */

  return (
    <section className="admin-users">
      {/* HEADER */}
      <header className="admin-users__header">
        <div>
          <h2 className="admin-users__title">Gestión de usuarios</h2>
          <span className="admin-users__total">
            Total: {filteredUsers.length}
          </span>
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

          <SearchBar
            textHolder="Buscar por nombre o email"
            value={search}
            onChange={setSearch}
          />

          <select
            className="admin-users__select"
            value={planFilter}
            onChange={(e) =>
              setPlanFilter(e.target.value as typeof planFilter)
            }
          >
            <option value="Todos">Todos</option>
            <option value="Gratuito">Gratuito</option>
            <option value="Mensual">Mensual</option>
            <option value="Anual">Anual</option>
          </select>
        </div>
      </header>

      {/* USERS */}
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
                <span
                  className={`admin-users__plan admin-users__plan--${user.plan.toLowerCase()}`}
                >
                  {user.plan}
                </span>
              </div>

              <div className="admin-users__metrics">
                {Object.entries(user.metrics).map(([key, value]) => {
                  const restricted =
                    user.restrictions[key as keyof Restrictions];

                  return (
                    <div
                      key={key}
                      className={`admin-users__metric ${
                        restricted
                          ? "admin-users__metric--restricted"
                          : ""
                      } ${!isEditing ? "admin-users__metric--disabled" : ""}`}
                    >
                      <div>
                        <span className="admin-users__metric-label">{key}</span>
                        <span className="admin-users__metric-value">
                          {value}
                        </span>
                      </div>

                      <label className="admin-users__switch">
                        <input
                          type="checkbox"
                          disabled={!isEditing}
                          checked={restricted}
                          onChange={(e) =>
                            toggleRestriction(
                              user.id,
                              key as keyof Restrictions,
                              e.target.checked
                            )
                          }
                        />
                        <span className="admin-users__slider" />
                      </label>
                    </div>
                  );
                })}
              </div>

              <div className="admin-users__footer">
                <div className="admin-users__actions">
                   {user.isLoggedIn && (
                    <button
                      className="admin-users__btn admin-users__btn--danger"
                      onClick={() => {
                        setEditingUserId(user.id);
                        setPendingAction("logout");
                        setShowPasswordPopup(true);
                      }}
                    >
                      Cerrar sesión
                    </button>
                  )}

                  <button
                    className="admin-users__btn admin-users__btn--secondary"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowHistoryPopup(true);
                    }}
                  >
                    Ver historial
                  </button>

                  <button
                    className="admin-users__btn admin-users__btn--primary"
                    onClick={() => {
                      if (!isEditing) {
                        setEditingUserId(user.id);
                        setPendingAction("edit");
                        setShowPasswordPopup(true);
                      } else {
                        setEditingUserId(null);
                      }
                    }}
                  >
                    {isEditing ? "Guardar cambios" : "Habilitar edición"}
                  </button>
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

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
              }}
              className={`admin-users__input ${
                passwordError ? "admin-users__input--error" : ""
              }`}
            />

            {passwordError && (
              <div className="admin-users__error-box">
                Contraseña incorrecta
              </div>
            )}

            <div className="admin-users__popup-actions">
              <button
                className="admin-users__btn admin-users__btn--secondary"
                onClick={() => {
                  setShowPasswordPopup(false);
                  setEditingUserId(null);
                  setPendingAction(null);
                  setPassword("");
                  setPasswordError(false);
                }}
              >
                Cancelar
              </button>

              <button
                className="admin-users__btn admin-users__btn--primary"
                onClick={validatePassword}
              >
                Validar
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

            <div className="admin-users__popup-actions">
              <button
                className="admin-users__btn admin-users__btn--secondary"
                onClick={() => setShowHistoryPopup(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
