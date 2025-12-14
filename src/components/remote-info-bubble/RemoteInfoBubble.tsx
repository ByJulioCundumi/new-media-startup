import React, { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Typewriter } from "react-simple-typewriter";
import "./remoteinfobubble.scss";
import { FaRegShareSquare } from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";

const RemoteInfoBubble: React.FC = () => {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="remote-info-bubble">
      <div className="info-container">
        {/* Icono de información */}
        <MdWorkOutline className="info-icon" />

        {/* Texto con typing infinito */}
        <div className="info-text">
          <Typewriter
            words={["Gana Comisiones del 70%"]}
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
