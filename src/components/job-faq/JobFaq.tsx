import { useState } from "react";
import "./jobFaq.scss";
import {
  FaChevronDown,
  FaQuestionCircle,
} from "react-icons/fa";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "¿Necesito experiencia previa para aplicar?",
    answer:
      "No. Esta oferta está dirigida a personas sin experiencia previa. Recibirás acceso a materiales y recursos que te permitirán comenzar a promocionar la plataforma desde el primer día.",
  },
  {
    question: "¿En qué consiste el trabajo como promotor afiliado?",
    answer:
      "Tu función será recomendar y promocionar las herramientas de creación de CVs profesionales de la plataforma. Por cada usuario que contrate un plan premium a través de tu enlace, recibirás una comisión.",
  },
  {
    question: "¿Cómo funcionan las comisiones?",
    answer:
      "Obtendrás hasta un 50% de comisión por cada venta realizada. Las comisiones son recurrentes, lo que significa que sigues ganando mientras el usuario referido mantenga su suscripción activa.",
  },
  {
    question: "¿El trabajo es realmente remoto?",
    answer:
      "Sí. Puedes realizar esta actividad desde cualquier país y en el horario que prefieras. Solo necesitas conexión a internet.",
  },
  {
    question: "¿Cómo y cuándo se realizan los pagos?",
    answer:
      "Los pagos se realizan en dólares (USD) de forma periódica a través de los métodos habilitados por la plataforma, una vez alcanzado el mínimo de retiro.",
  },
  {
    question: "¿Debo pagar algo para aplicar?",
    answer:
      "Para aplicar al programa de afiliados es necesario contar con un CV profesional creado con una plantilla premium y un plan activo en la plataforma. Esto garantiza un estándar de calidad entre los afiliados.",
  },
  {
    question: "¿Hay límite de ingresos?",
    answer:
      "No. No existe un límite de ingresos. Tus ganancias dependen directamente del número de usuarios que refieras y de la continuidad de sus suscripciones.",
  },
];

const JobFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="job-faq">
      <header className="faq-header">
        <FaQuestionCircle />
        <h2>Preguntas frecuentes</h2>
      </header>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <article
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
          >
            <button
              className="faq-question"
              onClick={() => toggle(index)}
            >
              <span>{faq.question}</span>
              <FaChevronDown />
            </button>

            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default JobFaq;
