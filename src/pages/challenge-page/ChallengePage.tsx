import { mockProposals } from "../../util/challengesMock";
import "./challengepage.scss";
import Countdown from "../../components/count-down/CountDown";
import ChallengeInfo from "../../components/challenge-info/ChallengeIngo";
import { FaArrowsAltH } from "react-icons/fa";
import { CategorySelector } from "../../components/category-selector/CategorySelector";
import { useState } from "react";

function ChallengePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
            const [status, setStatus] = useState("all");

  return (
    <section className="challenge-page">
      <div className="challenge-page__select">
        <CategorySelector
                          selectedCategories={selectedCategories}
                          onCategoryChange={setSelectedCategories}
                        />
      </div>
      <div className="challenge-page__left">
        {mockProposals.slice(0, 3).map((challenge) => (
          <article key={challenge.id} className="challenge-page__item">
            <div className="challenge-page__item-main">
              <Countdown deadline={challenge.deadline} />
            </div>
            <FaArrowsAltH className="challenge-page__icon"/>
            <ChallengeInfo />
          </article>
        ))}
      </div>
    </section>
  );
}

export default ChallengePage;
