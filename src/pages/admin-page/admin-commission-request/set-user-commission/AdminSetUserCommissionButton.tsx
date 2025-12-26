// src/components/AdminSetUserCommissionButton.tsx
import React, { useState } from "react";
import "./adminsetusercommissionbutton.scss";
import { updateUserCommissionApi } from "../../../../api/admin";

interface UserOption {
  id: string;
  userName: string;
  email: string;
  affiliateCommission: number;
}

const AdminSetUserCommissionButton: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<UserOption[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserOption | null>(null);
  const [newCommission, setNewCommission] = useState(20);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar lista de usuarios cuando se abre el popup
  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:4000/api/admin/users", {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("No se pudieron cargar los usuarios");

      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  const openPopup = () => {
    setShowPopup(true);
    setSearch("");
    setSelectedUser(null);
    setNewCommission(20);
    loadUsers();
  };

  const handleConfirm = async () => {
    if (!selectedUser) return;

    if (newCommission < 0 || newCommission > 100) {
      alert("El porcentaje debe estar entre 0 y 100");
      return;
    }

    if (!window.confirm(`¿Confirmas cambiar la comisión de ${selectedUser.userName} a ${newCommission}%?`)) {
      return;
    }

    setLoading(true);
    try {
      await updateUserCommissionApi(selectedUser.id, newCommission);

      alert(`¡Comisión actualizada a ${newCommission}% para ${selectedUser.userName}!`);
      setShowPopup(false);
    } catch (err: any) {
      alert(err.message || "No se pudo actualizar la comisión");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.userName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Botón flotante */}
      <button
        className="admin-set-commission-btn"
        onClick={openPopup}
        title="Cambiar % comisión de usuario"
      >
        % Comisiones
      </button>

      {/* Popup */}
      {showPopup && (
        <div className="commission-popup-overlay" onClick={() => !loading && setShowPopup(false)}>
          <div className="commission-popup" onClick={(e) => e.stopPropagation()}>
            <header>
              <h3>Cambiar % de comisión</h3>
              <button
                className="close-btn"
                onClick={() => setShowPopup(false)}
                disabled={loading}
              >
                ✕
              </button>
            </header>

            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                disabled={loading}
              />
            </div>

            {loading ? (
              <p>Cargando usuarios...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : (
              <div className="users-list">
                {filteredUsers.length === 0 ? (
                  <p>No se encontraron usuarios</p>
                ) : (
                  filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className={`user-item ${
                        selectedUser?.id === user.id ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedUser(user);
                        setNewCommission(user.affiliateCommission);
                      }}
                    >
                      <div>
                        <p>{user.userName}</p>
                        <p>{user.email}</p>
                      </div>
                      <span className="current-commission">
                        Actual: {user.affiliateCommission}%
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}

            {selectedUser && (
              <div className="commission-input">
                <label>Nueva comisión (%):</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={5}
                  value={newCommission}
                  onChange={(e) => setNewCommission(Number(e.target.value))}
                  disabled={loading}
                />
              </div>
            )}

            <footer>
              <button
                className="btn-secondary"
                onClick={() => setShowPopup(false)}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                className="btn-primary"
                disabled={loading || !selectedUser}
                onClick={handleConfirm}
              >
                {loading ? "Actualizando..." : "Actualizar comisión"}
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSetUserCommissionButton;