import { useState } from "react"
import { CategorySelector } from "../../components/category-selector/CategorySelector"
import ChallengeRequested from "../../components/challenge-requested/ChallengeRequested"
import { mockProposals } from "../../util/challengesMock"
import "./challengespage.scss"
import { TbBookmark } from "react-icons/tb"
import GenderFilter from "../../components/gender-filter/GenderFilter"
import StatusSelect from "../../components/status-select/StatusSelect"

function ChallengesPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
          const [status, setStatus] = useState("all");

  return (
    <section className="challenges-page">
      <div className="challenges-page__select">

        <button className="saved-btn"><TbBookmark/></button>
        
          <CategorySelector
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
          />

        <GenderFilter/>

        <StatusSelect
          value={status}
          onChange={setStatus}
        />
                </div>

        <div className="challenges-page__container">
          {mockProposals.map((challenge) => (
            <div className="challenges-page__item">
              <ChallengeRequested key={challenge.id} {...challenge} />
            </div>
          ))}
        </div>

    </section>
  )
}

export default ChallengesPage