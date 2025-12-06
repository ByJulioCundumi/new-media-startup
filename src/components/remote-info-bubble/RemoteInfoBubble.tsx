import React, { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Typewriter } from "react-simple-typewriter";
import "./remoteinfobubble.scss";
import { LuMessageSquareMore, LuMessagesSquare } from "react-icons/lu";

const RemoteInfoBubble: React.FC = () => {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="remote-info-bubble">
      <div className="info-container">
        {/* Icono de información */}
        <LuMessageSquareMore className="info-icon" />

        {/* Texto con typing infinito */}
        <div className="info-text">
          <Typewriter
            words={["Trabaja En Remoto Sin Experiencia"]}
            loop={0} // infinito
            typeSpeed={45}
            deleteSpeed={45}
            delaySpeed={2000}
            cursor
            cursorStyle="|"
          />
        </div>

        {/* Botón de cerrar */}
        <IoClose className="close-icon" onClick={() => setClosed(true)} />
      </div>
    </div>
  );
};

export default RemoteInfoBubble;
