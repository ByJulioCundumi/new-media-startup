import React, { useState } from "react";
import { CgMoreVertical } from "react-icons/cg";
import { BsHeart, BsPatchCheckFill, BsShieldCheck } from "react-icons/bs";
import { MdFlagCircle, MdLockPerson, MdOutlineKeyboardDoubleArrowRight, MdVideoSettings } from "react-icons/md";
import { IoCheckmarkDoneOutline, IoDiamond, IoFootstepsOutline, IoFootstepsSharp, IoPlay, IoPulseOutline, IoReceiptOutline } from "react-icons/io5";
import { GiCheckeredFlag, GiFilmProjector, GiLaurelsTrophy, GiSandsOfTime, GiTrophyCup } from "react-icons/gi";
import { AiOutlineFieldNumber } from "react-icons/ai";

import "./challengerequested.scss";
import { TbArrowBigDown, TbArrowBigUp, TbEdit, TbInfoCircle, TbReceiptDollar, TbSettingsCode, TbTicket } from "react-icons/tb";
import { LuConciergeBell, LuListTodo, LuReceipt, LuReceiptText, LuSettings2 } from "react-icons/lu";
import { FaRegComment, FaVenusMars } from "react-icons/fa";
import { PiPulse, PiPulseDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

interface ChallengeRequestedProps {
  initialExpanded?: boolean;
}

const description =
  "Realiza un unboxing creativo de un gadget popular. Crea un tutorial sobre desarrollo web. Realiza un unboxing creativo de un gadget popular.";

export default function ChallengeRequested({
  initialExpanded = false,
}: ChallengeRequestedProps) {

   const [expanded, setExpanded] = useState(initialExpanded);
   const navigate = useNavigate()
  const progress = 10;

  const isLong = description.length > 95;
  const visibleText = expanded ? description : description.slice(0, 95);
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
          <p className="challenge-requested__description" onClick={()=> navigate("/post")}>
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
            <p><TbInfoCircle /> Oferta segun interes</p>
            <span>
               $0.00 USD
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
              <PiPulseDuotone className="challenge-requested__progress-left" />
              <div className="challenge-requested__progress-bar">
                <div style={{ width: `${progress}%` }} />
              </div>
              <MdFlagCircle className="challenge-requested__progress-right" />
            </div>
            <span>
             10% De Interes
            </span>
          </div>

        </div>

        <div className="challenge-requested__user">
          <img
            src="https://www.redaccionmedica.com/images/destacados/la-rae-modifica-a-medias-la-definicion-de-doula-a-peticion-de-enfermeria--5704_620x368.jpg"
            alt="avatar"
          />

          <div>
            <p className="name">@user_name313</p>
          </div>

          <button className="challenge-requested__button">
              Apoyar Reto
          </button>

          <CgMoreVertical className="challenge-requested__menu" />
        </div>
      </div>
    </article>
  );
}
