import { useState } from "react"
import { CategorySelector } from "../../components/category-selector/CategorySelector"
import ChallengeRequested from "../../components/challenge-requested/ChallengeRequested"
import { mockProposals } from "../../util/challengesMock"
import "./requestpage.scss"
import { TbBookmark } from "react-icons/tb"
import GenderFilter from "../../components/gender-filter/GenderFilter"
import StatusSelect from "../../components/status-select/StatusSelect"

function RequestPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
          const [status, setStatus] = useState("all");

  return (
    <section className="request-page">
      <div className="request-page__select">
        <button className="explore__saved"><TbBookmark/></button>
        
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

        <div className="request-page__container">
          {mockProposals.map((challenge) => (
            <div className="request-page__item">
              <ChallengeRequested key={challenge.id} {...challenge} />
            </div>
          ))}
        </div>

    </section>
  )
}

export default RequestPage