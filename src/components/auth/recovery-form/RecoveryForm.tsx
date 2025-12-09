import { useState } from "react";
import { IoEye, IoEyeOff, IoCheckmarkCircle } from "react-icons/io5";
import "./recoveryform.scss";
import { requestPasswordReset, resetPassword } from "../../../api/auth"; // los agregaremos al API

interface Props {
  goLogin: () => void;
}

function RecoveryForm({ goLogin }: Props) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"send" | "verify" | "success" | "reset">("send");
  const [inputCode, setInputCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------------------
  // 1️⃣ Solicitar código de recuperación
  // ---------------------------
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await requestPasswordReset(email);

      if (res.codeSent) {
        setStep("verify");
      } else {
        setError(res.message || "No se pudo enviar el código");
      }
    } catch (err: any) {
      setError(err?.message || "Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };
  
  // ---------------------------
// 2️⃣ Verificar código ingresado
// ---------------------------
const handleVerifyCode = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    // Consultamos al backend si el código es válido
    const res = await resetPassword(email, inputCode, ""); // enviamos "" como newPassword solo para validar
    if (res.message === "Código inválido" || res.message === "Código expirado") {
      setError(res.message);
    } else {
      // Código válido, podemos avanzar
      setStep("reset");
    }
  } catch (err: any) {
    setError(err?.message || "Error de conexión con el servidor");
  } finally {
    setLoading(false);
  }
};


  // ---------------------------
  // 3️⃣ Restablecer contraseña
  // ---------------------------
  const handleResetPassword = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const res = await resetPassword(email, inputCode, newPassword);

    // Solo avanzamos a "success" si el backend confirma el cambio
    if (res.message === "Contraseña actualizada correctamente") {
      setStep("success");
      setTimeout(() => goLogin(), 2000);
    } else {
      setError(res.message || "No se pudo restablecer la contraseña");
    }
  } catch (err: any) {
    setError(err?.message || "Error de conexión con el servidor");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="recoveryform">
      <div className="recoveryform__container">
        {/* ENVIAR CÓDIGO */}
        {step === "send" && (
          <>
            <h2 className="recoveryform__title">Recuperar Contraseña</h2>
            <p className="recoveryform__subtitle">
              Ingresa tu correo para enviarte un código.
            </p>

            <form className="recoveryform__form" onSubmit={handleSendCode}>
              <div className="recoveryform__group">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {error && <p className="error">{error}</p>}

              <button className="recoveryform__btn" disabled={loading}>
                {loading ? "Enviando..." : "Enviar código"}
              </button>
            </form>

            <button className="recoveryform__resend" onClick={goLogin}>
              Volver al inicio de sesión
            </button>
          </>
        )}

        {/* VERIFICAR */}
        {step === "verify" && (
          <>
            <h2 className="recoveryform__title">Verificar Código</h2>

            <form className="recoveryform__form" onSubmit={handleVerifyCode}>
              <div className="recoveryform__group">
                <label>Código</label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  required
                />
              </div>

              {error && <p className="error">{error}</p>}

              <button className="recoveryform__btn" disabled={loading}>
                {loading ? "Verificando..." : "Verificar"}
              </button>
            </form>

            <button className="recoveryform__resend" onClick={goLogin}>
              Volver al inicio de sesión
            </button>
          </>
        )}

        {/* ÉXITO */}
        {step === "success" && (
          <div className="recoveryform__success">
            <IoCheckmarkCircle className="icon" />
            <h3>¡Contraseña restablecida!</h3>
            <p>Redirigiendo al inicio de sesión…</p>
          </div>
        )}

        {/* RESET PASSWORD */}
        {step === "reset" && (
          <>
            <h2 className="recoveryform__title">Restablecer Contraseña</h2>

            <form className="recoveryform__form" onSubmit={handleResetPassword}>
              <div className="recoveryform__group">
                <label>Nueva contraseña</label>

                <div className="recoveryform__password">
                  <input
                    type={showNewPass ? "text" : "password"}
                    placeholder="********"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="toggle"
                    onClick={() => setShowNewPass(!showNewPass)}
                  >
                    {showNewPass ? <IoEyeOff /> : <IoEye />}
                  </button>
                </div>
              </div>

              {error && <p className="error">{error}</p>}

              <button className="recoveryform__btn" disabled={loading}>
                {loading ? "Guardando..." : "Guardar"}
              </button>
            </form>

            <button className="recoveryform__resend" onClick={goLogin}>
              Volver al inicio de sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default RecoveryForm;
