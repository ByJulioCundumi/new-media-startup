import React, { useState } from "react"
import "./videosection.scss"
import VideoCard from "../../components/video-card/VideoCard"

const mockVideos = [
  {
    duration: "5:00",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    thumbnailUrl: "https://i.ytimg.com/vi/b23XLKW9MvQ/hq720.jpg",
    timeAgo: "3 días atrás",
    description: "Reto de baile en público: gana hasta 10 USDC.",
    username: "María",
  },
  {
    duration: "6:15",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
    thumbnailUrl: "https://i.ytimg.com/vi/b23XLKW9MvQ/hq720.jpg",
    timeAgo: "1 semana atrás",
    description: "Desafío creativo de cocina con premio en USDC.",
    username: "Andrés",
  },
  {
    duration: "4:40",
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
    thumbnailUrl: "https://i.ytimg.com/vi/b23XLKW9MvQ/hq720.jpg",
    timeAgo: "2 semanas atrás",
    description: "Completa el reto fitness y recibe recompensas.",
    username: "Laura",
  },
  {
    duration: "3:20",
    profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
    thumbnailUrl: "https://i.ytimg.com/vi/b23XLKW9MvQ/hq720.jpg",
    timeAgo: "5 días atrás",
    description: "Reto de comedia rápida: muestra tu lado divertido.",
    username: "Camilo",
  },
]

const categories = [
  "Cine",
  "Retos",
  "Comedia",
  "Baile",
  "Fitness",
  "Creatividad",
  "Exclusivos",
  "+ Más",
]

const VideoSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("+ Más")

  return (
    <section className="video-section">
      {/* ===== HEADER ===== */}
      <div className="video-section__header">
        <div className="video-section__header-row">
          <div className="video-section__header-top">
            <h2>Explora el catálogo de retos completados</h2>
            <p className="video-section__text">
              Descubre desafíos reales ya cumplidos por la comunidad.
              Videos auténticos, recompensas reales y contenido exclusivo
              para miembros.
            </p>
          </div>
        </div>

        <div className="video-section__categories">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-chip ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* ===== CAROUSEL ===== */}
      <div className="video-carousel">
        <div className="video-carousel__track">
          {[...mockVideos, ...mockVideos].map((video, index) => (
            <div className="video-carousel__item" key={index}>
              <VideoCard {...video} />
            </div>
          ))}
        </div>
      </div>

      <div className="video-carousel">
        <div className="video-carousel__track">
          {[...mockVideos, ...mockVideos].map((video, index) => (
            <div className="video-carousel__item" key={index}>
              <VideoCard {...video} />
            </div>
          ))}
        </div>
      </div>

      <button className="propose-challenge-btn">
            + Proponer Un Nuevo Reto
          </button>
    </section>
  )
}

export default VideoSection
