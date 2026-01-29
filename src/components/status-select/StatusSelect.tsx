import { useEffect, useRef, useState } from "react";
import "./statusselect.scss";

const STATUS_OPTIONS = [
  { label: "Todos", value: "all" },
  { label: "Disponible", value: "available" },
  { label: "En Curso", value: "production" },
];

interface StatusSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const StatusSelect = ({ value, onChange }: StatusSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    STATUS_OPTIONS.find(option => option.value === value) ??
    STATUS_OPTIONS[0];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () =>
      document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelect = (newValue: string) => {
    onChange(newValue);
    setIsOpen(false);
  };

  return (
    <div className="status-select" ref={containerRef}>
      <button
        type="button"
        className="status-select__trigger"
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
      >
        <span className="status-select__value">
          {selectedOption.label}
        </span>

        <span
          className={`status-select__chevron ${
            isOpen ? "is-open" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul className="status-select__dropdown">
          {STATUS_OPTIONS.map(option => (
            <li
              key={option.value}
              className={`status-select__option ${
                option.value === value ? "is-active" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatusSelect;
