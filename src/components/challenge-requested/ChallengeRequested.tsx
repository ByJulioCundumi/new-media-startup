import React, { useState } from "react";
import { CgMoreVertical } from "react-icons/cg";
import { BsHeart, BsPatchCheckFill, BsShieldCheck } from "react-icons/bs";
import { MdFlagCircle, MdLockPerson, MdOutlineKeyboardDoubleArrowRight, MdVideoSettings } from "react-icons/md";
import { IoCheckmarkDoneOutline, IoDiamond, IoFootstepsOutline, IoFootstepsSharp, IoPlay, IoReceiptOutline } from "react-icons/io5";
import { GiCheckeredFlag, GiFilmProjector, GiLaurelsTrophy, GiSandsOfTime } from "react-icons/gi";
import { AiOutlineFieldNumber } from "react-icons/ai";

import "./challengerequested.scss";
import { TbArrowBigDown, TbArrowBigUp, TbEdit, TbSettingsCode, TbTicket } from "react-icons/tb";
import { LuConciergeBell, LuListTodo, LuReceipt, LuSettings2 } from "react-icons/lu";
import { FaRegComment, FaVenusMars } from "react-icons/fa";

interface ChallengeRequestedProps {
  initialExpanded?: boolean;
}

const description =
  "Realiza un unboxing creativo de un gadget popular. Crea un tutorial sobre desarrollo web. Realiza un unboxing creativo de un gadget popular.";

export default function ChallengeRequested({
  initialExpanded = false,
}: ChallengeRequestedProps) {

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
    <article className="challenge-requested">
    

      {/* BOTÓN PARTICIPA */}
          

      {/* PARTE SUPERIOR */}
      <div className="challenge-requested__image">
        <div className="challenge-requested__text-box">
          <p className="challenge-requested__description">
            <span className="challenge-requested__num">
              <MdLockPerson /> Reto 001
            </span>
            
            {visibleText}
            {isLong && (
              <span
                className="challenge-requested__see-more"
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
            expanded && <div className="challenge-requested__list">
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

          <div className="challenge-requested__prize">
            <span>
              <GiFilmProjector className="challenge-requested__green" /> Entrega en 7 días
            </span>
            <span>
              <IoPlay className="challenge-requested__green" /> 4:00 min
            </span>
          </div>
        </div>

        {expanded && (
          <div className="challenge-requested__tags">
            <span>Outdoor</span>
            <span>Super Market</span>
            <span>Funny</span>
            <span>Super Cringe</span>
          </div>
        )}
        
      </div>

      {/* FOOTER */}
      <div className="challenge-requested__footer">
        <div className="challenge-requested__progress">
          <div className="challenge-requested__interactions">
            <p>
              <BsHeart /> 251
            </p>
            
            <p>
                <FaRegComment /> 621
            </p>
          </div>

          <div className="challenge-requested__progress--main">
            <div className="challenge-requested__progress--box">
              <TbTicket className="challenge-requested__progress-left" />
              <div className="challenge-requested__progress-bar">
                <div style={{ width: `${progress}%` }} />
              </div>
              <MdFlagCircle className="challenge-requested__progress-right" />
            </div>
            <span>
             <TbTicket /> 10% de interes
            </span>
          </div>

          <CgMoreVertical className="challenge-requested__menu" />
        </div>

        <div className="challenge-requested__user">
          <img
            src="https://www.redaccionmedica.com/images/destacados/la-rae-modifica-a-medias-la-definicion-de-doula-a-peticion-de-enfermeria--5704_620x368.jpg"
            alt="avatar"
          />

          <div>
            <p className="name">@user_name231</p>
          </div>

          <button className="challenge-requested__button">
             Me Interesa Este Reto
          </button>
        </div>
      </div>
    </article>
  );
}
