import { useEffect, type JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { openAuthModal } from "../reducers/authModalSlice";
import type { IState } from "../interfaces/IState";

interface Props {
  children: JSX.Element;
}

const AuthGuard = ({ children }: Props) => {
  const dispatch = useDispatch();
  const { logged, role } = useSelector((state: IState) => state.user);

  useEffect(() => {
    if (!logged) {
      dispatch(openAuthModal({}));
    }
  }, [logged, dispatch]);

  if ((!logged || (logged && role === "ADMIN"))) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthGuard;
