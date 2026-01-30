import { useState } from "react"
import { CategorySelector } from "../../components/category-selector/CategorySelector"
import ChallengeRequested from "../../components/challenge-requested/ChallengeRequested"
import { mockProposals } from "../../util/challengesMock"
import "./requestpage.scss"

function RequestPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
          const [status, setStatus] = useState("all");

  return (
    <section className="request-page">
      <div className="video-page__select">
                  <CategorySelector
                    selectedCategories={selectedCategories}
                    onCategoryChange={setSelectedCategories}
                  />
                </div>

        <div className="request-page__container">
          {mockProposals.map((challenge) => (
            <ChallengeRequested key={challenge.id} {...challenge} />
          ))}
        </div>

    </section>
  )
}

export default RequestPage