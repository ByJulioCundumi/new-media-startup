import { useEffect, type JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { IState } from "../interfaces/IState";
import { openAuthModal } from "../reducers/authModalSlice";

interface Props {
  children: JSX.Element;
}

const AdminGuard = ({ children }: Props) => {
  const dispatch = useDispatch();
  const { logged, role } = useSelector((state: IState) => state.user);

  useEffect(() => {
    if (!logged) {
      dispatch(openAuthModal({ section: "login" }));
    }
  }, [logged, dispatch]);

  // ❌ No logeado
  if (!logged) {
    return <Navigate to="/" replace />;
  }

  // ❌ Logeado pero no admin
  if (role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  // ✅ Logeado + admin
  return children;
};

export default AdminGuard;
