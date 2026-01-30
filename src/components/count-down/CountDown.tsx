import { useEffect, useState } from "react";
import "./countdown.scss"

interface CountdownProps {
  deadline: string | Date;
}

const Countdown: React.FC<CountdownProps> = ({ deadline }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(deadline).getTime() - new Date().getTime();

    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return <span className="countdown countdown--ended">Tiempo agotado</span>;
  }

  return (
    <div className="countdown">
    <div className="countdown__unit">
      <span className="countdown__value">{timeLeft.days}</span>
      <span className="countdown__label">Días</span>
    </div>

    <span className="countdown__separator">:</span>

    <div className="countdown__unit">
      <span className="countdown__value">{timeLeft.hours}</span>
      <span className="countdown__label">Horas</span>
    </div>

    <span className="countdown__separator">:</span>

    <div className="countdown__unit">
      <span className="countdown__value">{timeLeft.minutes}</span>
      <span className="countdown__label">Min</span>
    </div>

    <span className="countdown__separator">:</span>

    <div className="countdown__unit countdown__unit--seconds">
      <span className="countdown__value">{timeLeft.seconds}</span>
      <span className="countdown__label">Seg</span>
    </div>
  </div>
  );
};

export default Countdown;
