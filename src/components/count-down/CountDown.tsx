import { useEffect, useState } from "react";
import "./countdown.scss";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const mockUser = {
  id: "USR-28491",
  username: "creator_julio",
  avatarUrl: "" // deja vacío para fallback
};

interface CountdownProps {
  deadline: string | Date;
}

const Countdown: React.FC<CountdownProps> = ({ deadline }) => {
  const calculateTimeLeft = (): TimeLeft | null => {
    const difference =
      new Date(deadline).getTime() - new Date().getTime();

    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
    calculateTimeLeft()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <span className="countdown countdown--ended">
        Plazo finalizado
      </span>
    );
  }

  return (
    <div className="countdown-box">

      {/* USER (MOCK) */}
      <div className="countdown-user">
        <div className="countdown-user__avatar">
          {mockUser.avatarUrl ? (
            <img
              src={mockUser.avatarUrl}
              alt={mockUser.username}
            />
          ) : (
            <span>
              {mockUser.username.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="countdown-user__info">
          <strong>@{mockUser.username}</strong>
          <span>ID · {mockUser.id}</span>
        </div>
      </div>

      {/* PAYMENT */}
      <div className="countdown-meta">
        <span className="countdown-meta__label">
          Pago ofrecido
        </span>
        <span className="countdown-meta__value">
          $15 USD
        </span>
      </div>

      {/* DEADLINE */}
      <h3 className="countdown-title">
        Fecha límite de entrega
      </h3>

      <div className="countdown">
        <div className="countdown__unit">
          <span className="countdown__value">
            {timeLeft.days}
          </span>
          <span className="countdown__label">Días</span>
        </div>

        <span className="countdown__separator">:</span>

        <div className="countdown__unit">
          <span className="countdown__value">
            {timeLeft.hours}
          </span>
          <span className="countdown__label">Horas</span>
        </div>

        <span className="countdown__separator">:</span>

        <div className="countdown__unit">
          <span className="countdown__value">
            {timeLeft.minutes}
          </span>
          <span className="countdown__label">Min</span>
        </div>

        <span className="countdown__separator">:</span>

        <div className="countdown__unit countdown__unit--seconds">
          <span className="countdown__value">
            {timeLeft.seconds}
          </span>
          <span className="countdown__label">Seg</span>
        </div>
      </div>

      {/* STATUS */}
      <div className="countdown-status">
        <span className="countdown-status__label">
          Estado del reto
        </span>
        <span className="countdown-status__badge">
          En fase de grabación
        </span>
      </div>

    </div>
  );
};

export default Countdown;
