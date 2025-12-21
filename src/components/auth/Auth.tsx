// Auth.tsx

import { useEffect, useRef } from "react";
import "./auth.scss";

import LoginForm from "./login-form/LoginForm";
import SignupForm from "./signup-form/SignupForm";
import RecoveryForm from "./recovery-form/RecoveryForm";

import { useDispatch, useSelector } from "react-redux";
import { closeAuthModal, setSection } from "../../reducers/authModalSlice";
import { setUser } from "../../reducers/userSlice";
import { addFavoriteTemplateApi } from "../../api/user";
import type { AuthUser } from "../../api/auth";
import type { IState } from "../../interfaces/IState";

export default function Auth() {
  const popupRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const { isOpen, section } = useSelector((state: IState) => state.authModal);

  const handleClose = () => {
    dispatch(closeAuthModal());
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

  const handleSuccess = async (user: AuthUser) => {
    dispatch(setUser(user));

    const localFavs = JSON.parse(localStorage.getItem("localFavorites") || "[]");
    if (localFavs.length > 0) {
      for (const id of localFavs) {
        await addFavoriteTemplateApi(id);
      }
      localStorage.removeItem("localFavorites");
    }
    handleClose();
  };

  const changeSection = (newSection: "login" | "signup" | "recovery") => {
    dispatch(setSection(newSection));
  };

  if (!isOpen) return null;

  return (
    <div className="auth">
      <div className="auth__content" ref={popupRef}>
        <button className="auth__close" onClick={handleClose}>✕</button>

        {section === "login" && (
          <LoginForm
            goSignup={() => changeSection("signup")}
            goRecovery={() => changeSection("recovery")}
            onLoginSuccess={handleSuccess}
          />
        )}

        {section === "signup" && (
          <SignupForm
            goLogin={() => changeSection("login")}
            onSignupSuccess={handleSuccess}
          />
        )}

        {section === "recovery" && (
          <RecoveryForm goLogin={() => changeSection("login")} />
        )}
      </div>
    </div>
  );
}