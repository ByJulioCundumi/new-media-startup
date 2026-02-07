import React, { useState } from "react";
import "./connectionspanel.scss";
import {
  FaUsers,
  FaUserFriends,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { TbWorldSearch } from "react-icons/tb";

type Tab = "followers" | "following" | "favorites";

const mockUsers = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  username: `creator_${i + 1}`,
  avatar: "https://i.pravatar.cc/150?img=" + (i + 10),
}));

const ConnectionsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("followers");
  const [search, setSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const selectedUser = mockUsers.find((u) => u.id === selectedUserId);

  const filteredUsers = mockUsers.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectUser = (id: number) => {
    setSelectedUserId((prev) => (prev === id ? null : id));
  };

  return (
    <aside className="connections-panel">

      {/* TABS */}
      <nav className="connections-panel__tabs">
        <button
          className={activeTab === "followers" ? "active" : ""}
          onClick={() => setActiveTab("followers")}
        >
          <FaUsers /> Seguidores
          <span>128</span>
        </button>

        <button
          className={activeTab === "following" ? "active" : ""}
          onClick={() => setActiveTab("following")}
        >
          <FaUserFriends /> Seguidos
          <span>74</span>
        </button>
      </nav>

      {/* SEARCH */}
      <div className="connections-panel__search">
        <FaSearch />
        <input
          placeholder="Buscar usuario..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* USERS */}
      <div className="connections-panel__list">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className={`user-row ${
              selectedUserId === user.id ? "selected" : ""
            }`}
            onClick={() => handleSelectUser(user.id)}
          >
            <img src={user.avatar} alt={user.username} />
            <span>@{user.username}</span>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <p className="empty">No se encontraron usuarios</p>
        )}
      </div>

      
        <button
          className={"connections-panel__users"}
          onClick={() => setActiveTab("favorites")}
        >
          <TbWorldSearch /> Usuarios 
        </button>
    </aside>
  );
};

export default ConnectionsPanel;
