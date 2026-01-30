import { useState } from "react"
import { CategorySelector } from "../../components/category-selector/CategorySelector"
import ConnectionsPanel from "../../components/connections-panel/ConnectionsPanel"
import CreateChallengeProposal from "../../components/create-challenge-proposal/CreateChallengeProposal"
import VideoCard from "../../components/video-card/VideoCard"
import "./videopage.scss"

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

function VideoPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
        const [status, setStatus] = useState("all");

  return (
    <section className="video-page">
        <div className="video-page__container">
          <CategorySelector
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
        />
          <div className="video-page__container--content">
            {[...mockVideos, ...mockVideos].map((video, index) => (
            <div className="video-carousel__item" key={index}>
              <VideoCard {...video} />
            </div>
          ))}
          </div>
        </div>

    </section>
  )
}

export default VideoPage