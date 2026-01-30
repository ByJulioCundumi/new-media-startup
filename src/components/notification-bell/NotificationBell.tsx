import React, { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import "./notificationbell.scss";

interface Notification {
  id: number;
  message: string;
  date: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    message: "Tu video fue aprobado 🎉",
    date: "Hace 2 horas",
    read: false
  },
  {
    id: 2,
    message: "Nuevo comentario en tu reto",
    date: "Hace 1 día",
    read: false
  },
  {
    id: 3,
    message: "Has recibido un pago de $5 USD",
    date: "Hace 3 días",
    read: true
  }
];

const NotificationBell: React.FC = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="notification-bell" ref={containerRef}>
      <button
        className="notification-bell__icon"
        onClick={() => setOpen(!open)}
      >
        <FaBell size={20} />

        {unreadCount > 0 && (
          <span className="notification-bell__badge">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="notification-popup">
          <div className="notification-popup__header">
            <span>Notificaciones</span>
          </div>

          <div className="notification-popup__list">
            {mockNotifications.length === 0 ? (
              <p className="empty">No tienes notificaciones</p>
            ) : (
              mockNotifications.map(notification => (
                <div
                  key={notification.id}
                  className={`notification-item ${
                    !notification.read ? "unread" : ""
                  }`}
                >
                  <p>{notification.message}</p>
                  <span className="date">{notification.date}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
