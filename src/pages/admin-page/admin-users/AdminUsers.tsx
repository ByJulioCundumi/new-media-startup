import { useMemo, useState } from "react";
import "./adminusers.scss";
import SearchBar from "../../../components/search-bar/SearchBar";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  isRestricted: boolean;
  loginsPerDay: number;
  cvsCreatedPerDay: number;
  cvsUpdatedPerDay: number;
  passwordRecoveriesPerDay: number;
  plan: "Gratuito" | "Mensual" | "Anual";
  affiliateCommission: number;
}

const mockUsers: AdminUser[] = [
  {
    id: "1",
    name: "Carlos Gómez",
    email: "carlos@email.com",
    isRestricted: false,
    loginsPerDay: 3,
    cvsCreatedPerDay: 1,
    cvsUpdatedPerDay: 2,
    passwordRecoveriesPerDay: 0,
    plan: "Anual",
    affiliateCommission: 20,
  },
  {
    id: "2",
    name: "Laura Martínez",
    email: "laura@email.com",
    isRestricted: true,
    loginsPerDay: 0,
    cvsCreatedPerDay: 0,
    cvsUpdatedPerDay: 0,
    passwordRecoveriesPerDay: 1,
    plan: "Gratuito",
    affiliateCommission: 5,
  },
];

function AdminUsers() {
  const [search, setSearch] = useState("");
  const [showRestrictedOnly, setShowRestrictedOnly] = useState(false);
  const [planFilter, setPlanFilter] = useState<"Todos" | AdminUser["plan"]>(
    "Todos"
  );

  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [showRestrictionPopup, setShowRestrictionPopup] = useState(false);

  const [restrictions, setRestrictions] = useState({
    login: false,
    createCv: false,
    updateCv: false,
    recoverPassword: false,
  });

  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase();

    return mockUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.affiliateCommission.toString().includes(q);

      const matchesRestricted = showRestrictedOnly ? user.isRestricted : true;
      const matchesPlan =
        planFilter === "Todos" ? true : user.plan === planFilter;

      return matchesSearch && matchesRestricted && matchesPlan;
    });
  }, [search, showRestrictedOnly, planFilter]);

  return (
    <section className="admin-users">
      {/* HEADER */}
      <header className="admin-users__header">
        <div className="admin-users__summary">
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
            <span>Restringidos</span>
          </label>

          <SearchBar
            textHolder="Buscar por nombre, email o comisión (%)"
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
            <option value="Todos">Todos los planes</option>
            <option value="Gratuito">Plan gratuito</option>
            <option value="Mensual">Plan mensual</option>
            <option value="Anual">Plan anual</option>
          </select>
        </div>
      </header>

      {/* GRID */}
      <div className="admin-users__grid">
        {filteredUsers.map((user) => (
          <div key={user.id} className="admin-users__card">
            {/* IDENTITY */}
            <div className="admin-users__identity">
              <div>
                <span className="admin-users__name">{user.name}</span>
                <span className="admin-users__email">{user.email}</span>
              </div>

              <span
                className={`admin-users__plan admin-users__plan--${user.plan.toLowerCase()}`}
              >
                Plan {user.plan}
              </span>
            </div>

            {/* METRICS */}
            <div className="admin-users__metrics">
              <Metric
                label="Inicios sesión / día"
                value={user.loginsPerDay}
                restricted={user.isRestricted}
              />
              <Metric
                label="CVs creados / día"
                value={user.cvsCreatedPerDay}
                restricted={user.isRestricted}
              />
              <Metric
                label="CVs actualizados / día"
                value={user.cvsUpdatedPerDay}
                restricted={user.isRestricted}
              />
              <Metric
                label="Recuperaciones / día"
                value={user.passwordRecoveriesPerDay}
                restricted={user.isRestricted}
              />
            </div>

            {/* FOOTER */}
            <div className="admin-users__footer">
              <span className="admin-users__commission">
                Comisión afiliado: <strong>{user.affiliateCommission}%</strong>
              </span>

              <button
                className="admin-users__btn admin-users__btn--restrict"
                onClick={() => {
                  setSelectedUser(user);
                  setShowRestrictionPopup(true);
                }}
              >
                Restricciones
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* POPUP */}
      {showRestrictionPopup && selectedUser && (
        <div className="admin-users__overlay">
          <div className="admin-users__popup">
            <h3>Restricciones de usuario</h3>
            <p className="admin-users__popup-user">
              {selectedUser.name} – {selectedUser.email}
            </p>

            <div className="admin-users__switches">
              <RestrictionSwitch
                label="Restringir login"
                checked={restrictions.login}
                onChange={(v) =>
                  setRestrictions({ ...restrictions, login: v })
                }
              />
              <RestrictionSwitch
                label="Restringir creación de CVs"
                checked={restrictions.createCv}
                onChange={(v) =>
                  setRestrictions({ ...restrictions, createCv: v })
                }
              />
              <RestrictionSwitch
                label="Restringir actualización de CVs"
                checked={restrictions.updateCv}
                onChange={(v) =>
                  setRestrictions({ ...restrictions, updateCv: v })
                }
              />
              <RestrictionSwitch
                label="Restringir recuperación de contraseña"
                checked={restrictions.recoverPassword}
                onChange={(v) =>
                  setRestrictions({ ...restrictions, recoverPassword: v })
                }
              />
            </div>

            <div className="admin-users__popup-actions">
              <button
                className="admin-users__btn admin-users__btn--secondary"
                onClick={() => setShowRestrictionPopup(false)}
              >
                Cancelar
              </button>
              <button
                className="admin-users__btn admin-users__btn--primary"
                onClick={() => setShowRestrictionPopup(false)}
              >
                Guardar restricciones
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Metric({
  label,
  value,
  restricted,
}: {
  label: string;
  value: number;
  restricted?: boolean;
}) {
  return (
    <div
      className={`admin-users__metric ${
        restricted ? "admin-users__metric--restricted" : ""
      }`}
    >
      <span className="admin-users__metric-label">{label}</span>
      <span className="admin-users__metric-value">{value}</span>
    </div>
  );
}

function RestrictionSwitch({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="admin-users__switch">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="admin-users__slider" />
    </label>
  );
}

export default AdminUsers;
