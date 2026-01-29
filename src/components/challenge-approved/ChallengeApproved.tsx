import React, { useState } from "react";
import { CgMoreVertical } from "react-icons/cg";
import { BsPatchCheckFill, BsShieldCheck } from "react-icons/bs";
import { MdFlagCircle, MdOutlineKeyboardDoubleArrowRight, MdVideoSettings } from "react-icons/md";
import { IoCheckmarkDoneOutline, IoDiamond, IoFootstepsOutline, IoFootstepsSharp, IoPlay, IoReceiptOutline } from "react-icons/io5";
import { GiCheckeredFlag, GiFilmProjector, GiLaurelsTrophy } from "react-icons/gi";
import { AiOutlineFieldNumber } from "react-icons/ai";

import "./challengeapproved.scss";
import { TbArrowBigDown, TbArrowBigUp, TbEdit, TbSettingsCode, TbTicket } from "react-icons/tb";
import { LuListTodo, LuReceipt, LuSettings2 } from "react-icons/lu";

interface ChallengeApprovedProps {
  initialExpanded?: boolean;
}

const description =
  "Realiza un unboxing creativo de un gadget popular. Crea un tutorial sobre desarrollo web. Realiza un unboxing creativo de un gadget popular.";

export default function ChallengeApproved({
  initialExpanded = false,
}: ChallengeApprovedProps) {

   const [expanded, setExpanded] = useState(initialExpanded);
  const progress = 0;

  const isLong = description.length > 105;
  const visibleText = expanded ? description : description.slice(0, 105);
  const toggleText = expanded ? "Ver menos" : "...Ver más";

  const steps = [
    "Recauda 24 Puntos",
    "Graba El Desafio",
    "Envia Tu Video",
    "Supera La Evaluacion",
    "Gana",
  ];

  return (
    <article className="challenge-approved">
    

      {/* BOTÓN PARTICIPA */}
          

      {/* PARTE SUPERIOR */}
      <div className="challenge-approved__image">
        <div className="challenge-approved__text-box">
          <p className="challenge-approved__description">
            <span className="challenge-approved__num">
              <BsPatchCheckFill /> Reto <AiOutlineFieldNumber /> 001
            </span>
            
            {visibleText}
            {isLong && (
              <span
                className="challenge-approved__see-more"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
              >
                {toggleText}
              </span>
            )}
          </p>

          {
            expanded && <div className="challenge-approved__list">
            <p>Participa en 5 pasos:</p>

            <ul
                className="steps-mini"
              >
                {steps.map((step, index) => (
                  <li key={index}>
                    <span className="num"><IoFootstepsOutline />{index+1}.</span> {step}
                  </li>
                ))}
              </ul>
          </div>
          }

          <div className="challenge-approved__prize">
            <span>
              <GiFilmProjector className="challenge-approved__green" /> Entrega en 7 días
            </span>
            <span>
              <IoPlay className="challenge-approved__green" /> 4:00 min
            </span>
          </div>
        </div>

        {expanded && (
          <div className="challenge-approved__tags">
            <span>Outdoor</span>
            <span>Super Market</span>
            <span>Funny</span>
            <span>Super Cringe</span>
          </div>
        )}
        
      </div>

      {/* FOOTER */}
      <div className="challenge-approved__footer">
        <div className="challenge-approved__progress">
          <div className="challenge-approved__interactions">
            <p>
              <TbArrowBigUp />
            </p>
            <p>
              +22°
            </p>
            <p>
              <TbArrowBigDown />
            </p>
          </div>

          <div className="challenge-approved__progress--main">
            <div className="challenge-approved__progress--box">
              <TbTicket className="challenge-approved__progress-left" />
              <div className="challenge-approved__progress-bar">
                <div style={{ width: `${progress}%` }} />
              </div>
              <MdFlagCircle className="challenge-approved__progress-right" />
            </div>
            <span>
             <IoFootstepsOutline /> <AiOutlineFieldNumber /> 1: Logra 23 Pts
            </span>
          </div>

          <CgMoreVertical className="challenge-approved__menu" />
        </div>

        <div className="challenge-approved__user">
          {/* Botón circular con icono de editar */}
          <div className="challenge-approved__edit">
            <LuSettings2 />
          </div>

          <div>
            <p className="name"><IoReceiptOutline /> $25.00 USD</p>
            <p className="status">
              <IoCheckmarkDoneOutline /> Premio por completar
            </p>
          </div>

          <button className="challenge-approved__button">
            <MdOutlineKeyboardDoubleArrowRight /> Tomar Reto
          </button>
        </div>
      </div>
    </article>
  );
}
