import React from "react";
import "./VideoCard.scss";
import { CgMoreVertical } from "react-icons/cg";
import { FaRegComment } from "react-icons/fa";
import { LuHeart } from "react-icons/lu";
import { GiPodiumWinner, GiTrophyCup } from "react-icons/gi";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { IoPlayOutline } from "react-icons/io5";
import { BsPatchCheck } from "react-icons/bs";
import { useSelector } from "react-redux";
import type { IState } from "../../interfaces/IState";
import { TbRosetteDiscountCheck } from "react-icons/tb";

interface VideoCardProps {
  thumbnailUrl: string;
  profileImage: string;
  username: string;
  timeAgo: string;
  description: string;
  reward?: string;
  challengeNumber?: number;
  likes?: number;
  comments?: number;
  duration?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  thumbnailUrl,
  profileImage,
  username,
  timeAgo,
  description,
  reward = "$10.00 USD",
  challengeNumber = 1,
  likes = 154,
  comments = 57,
  duration = "3:45",
}) => {

  const {sidebarOption} = useSelector((state:IState) =>state.sidebar)

  return (
    <div className="video-card completed">
      <div className="video-card__media">
        <img src={thumbnailUrl} alt="Video thumbnail" className="video-card__thumbnail" />
        <div className="video-card__gradient" />
        <IoPlayOutline className="video-card__play" />

        <div className="video-card__duration">{duration}</div>

        <div className="video-card__reward">
          <GiTrophyCup /> <span>Ganó {reward}</span>
        </div>

        {
          sidebarOption !== "home" && <div className="video-card__reward">
          <GiTrophyCup /> <span>Ganó {reward}</span>
        </div>
        }

        <div className="video-card__actions">
          <button><LuHeart /> {likes}</button>
          <button><FaRegComment /> {comments}</button>
        </div>
      </div>

      <div className="video-card__info">
        <img src={profileImage} alt={username} className="video-card__avatar" />
        <div className="video-card__text">
          <p className="video-card__description">
            {description.length > 58 ? description.slice(0, 58) + "..." : description}
          </p>
          <p className="video-card__meta">
            <span className="user">@{username}</span> 
            <span>•</span>
            <span><BsPatchCheck className="verified" />Desafío <AiOutlineFieldNumber /> {challengeNumber.toString().padStart(3, "0")}</span>
          </p>
        </div>
        <button className="video-card__menu"><CgMoreVertical size={18} /></button>
      </div>
    </div>
  );
};

export default VideoCard;
