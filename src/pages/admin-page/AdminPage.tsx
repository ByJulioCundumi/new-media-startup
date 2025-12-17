import { useState } from "react";
import {
  MdDashboard,
  MdLockPerson,
  MdPeople,
  MdRequestQuote,
} from "react-icons/md";
import "./adminpage.scss";
import AdminDashboard from "./admin-dashboard/AdminDashboard";
import PasswordSettings from "../account-page/password-settings/PasswordSettings";
import AdminActions from "./admin-actions/AdminAction";
import AdminUsers from "./admin-users/AdminUsers";
import AdminCommissionRequest from "./admin-commission-request/AdminCommissionRequest";

type AdminSection = "dashboard" | "users" | "commissions" | "actions";

function AdminPage() {
  const [activeSection, setActiveSection] =
    useState<AdminSection>("dashboard");

  return (
    <section className="admin-page">
      {/* NAV */}
      <aside className="admin-page__sidebar">

        <nav className="admin-page__nav">
          <button
            className={`admin-page__nav-item ${
              activeSection === "dashboard"
                ? "admin-page__nav-item--active"
                : ""
            }`}
            onClick={() => setActiveSection("dashboard")}
          >
            <MdDashboard />
            Dashboard
          </button>

          <button
            className={`admin-page__nav-item ${
              activeSection === "actions"
                ? "admin-page__nav-item--active"
                : ""
            }`}
            onClick={() => setActiveSection("actions")}
          >
            <MdLockPerson />
            Acciones
          </button>

          <button
            className={`admin-page__nav-item ${
              activeSection === "users"
                ? "admin-page__nav-item--active"
                : ""
            }`}
            onClick={() => setActiveSection("users")}
          >
            <MdPeople />
            Usuarios
          </button>

          <button
            className={`admin-page__nav-item ${
              activeSection === "commissions"
                ? "admin-page__nav-item--active"
                : ""
            }`}
            onClick={() => setActiveSection("commissions")}
          >
            <MdRequestQuote />
            Solicitudes
          </button>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="admin-page__content">
        {activeSection === "dashboard" && (
            <AdminDashboard/>
        )}

        {activeSection === "actions" && (
          <>
            <AdminActions/>
            <PasswordSettings/>
          </>
        )}

        {activeSection === "users" && (
          <AdminUsers/>
        )}

        {activeSection === "commissions" && (
          <AdminCommissionRequest/>
        )}
      </main>
    </section>
  );
}

export default AdminPage;
