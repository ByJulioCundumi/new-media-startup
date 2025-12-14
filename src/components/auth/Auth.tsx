import { useEffect, useRef, useState } from "react";
import "./auth.scss";

import LoginForm from "./login-form/LoginForm";
import SignupForm from "./signup-form/SignupForm";
import RecoveryForm from "./recovery-form/RecoveryForm";

import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/userSlice"; // tu slice de usuario
import { addFavoriteTemplateApi } from "../../api/user";

type Section = "login" | "signup" | "recovery";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialSection: Section;
}

export default function Auth({ isOpen, onClose, initialSection }: Props) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [section, setSection] = useState<Section>("login");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) setSection(initialSection);
  }, [isOpen, initialSection]);

  const handleClose = () => {
    setSection("login");
    onClose();
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Función común para manejar login/signup exitoso
  const handleSuccess = async (user: { id: string; email: string; userName: string; favoriteTemplates: string[] }) => {
    dispatch(setUser(user)); // guardamos en Redux

    // Después de login exitoso
    const localFavs = JSON.parse(localStorage.getItem("localFavorites") || "[]");
    if (localFavs.length > 0) {
      for (const id of localFavs) {
        await addFavoriteTemplateApi(id);
      }
      localStorage.removeItem("localFavorites");
    }
    handleClose(); // cerramos el popup
  };

  if (!isOpen) return null;

  return (
    <div className="auth">
      <div className="auth__content" ref={popupRef}>
        <button className="auth__close" onClick={handleClose}>✕</button>

        {section === "login" && (
          <LoginForm
            goSignup={() => setSection("signup")}
            goRecovery={() => setSection("recovery")}
            onLoginSuccess={handleSuccess}
          />
        )}

        {section === "signup" && (
          <SignupForm
            goLogin={() => setSection("login")}
            onSignupSuccess={handleSuccess}
          />
        )}

        {section === "recovery" && (
          <RecoveryForm goLogin={() => setSection("login")} />
        )}
      </div>
    </div>
  );
}