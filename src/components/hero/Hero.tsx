import { useState, useEffect } from "react";
import "./hero.scss";
import {
  TbBrandCashapp,
  TbInfoSquareRounded,
  TbMoneybag,
  TbReportMoney,
} from "react-icons/tb";
import { MdOutlineAttachMoney } from "react-icons/md";

const steps = [
  {
    icon: <TbMoneybag />,
    title: "Elige un reto",
    desc: "Explora retos disponibles y selecciona el que quieras completar.",
  },
  {
    icon: <TbReportMoney />,
    title: "Recauda interés",
    desc: "Tu reto gana valor según el interés del público.",
  },
  {
    icon: <MdOutlineAttachMoney />,
    title: "Supera evaluación",
    desc: "Tu video es revisado para validar calidad y cumplimiento.",
  },
  {
    icon: <TbBrandCashapp />,
    title: "Vende y gana",
    desc: "Publicamos tu video y recibes tu pago.",
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  // Auto carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % steps.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="hero__container">
        {/* LEFT */}
        <div className="hero__left">
          <div className="hero__heading">
            <h1 className="hero__headline">
              <span>Genera Ingresos</span> Realizando
              Retos <br /> <span>En Video</span>
            </h1>

            <p className="hero__subheadline">
              <TbInfoSquareRounded /> Gana un 20% de comision como afiliado
            </p>
          </div>
        </div>

        {/* RIGHT CTA */}
        <aside className="hero__cta">

          <div className="hero__carousel">
            <div key={index} className="hero__slide">
              <div className="hero__icon">{steps[index].icon}</div>
              <h4>{index+1}. {steps[index].title}</h4>
              <p>{steps[index].desc}</p>
            </div>
          </div>

          {/* Dots */}
          <div className="hero__dots">
            {steps.map((_, i) => (
              <span
                key={i}
                className={i === index ? "active" : ""}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

          <button className="hero__cta-btn">Elegir reto</button>
        </aside>
      </div>
    </section>
  );
};

export default Hero;
