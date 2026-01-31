import { mockProposals } from "../../util/challengesMock";
import "./challengepage.scss";
import Countdown from "../../components/count-down/CountDown";
import ChallengeInfo from "../../components/challenge-info/ChallengeIngo";
import { FaArrowsAltH } from "react-icons/fa";

function ChallengePage() {
  return (
    <section className="challenge-page">
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
