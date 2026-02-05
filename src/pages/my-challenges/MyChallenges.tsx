import ChallengeRequested from "../../components/challenge-requested/ChallengeRequested"
import { mockProposals } from "../../util/challengesMock"
import "./mychallenges.scss"

function MyChallenges() {
  return (
    <div className="challenges-page__container">
              {mockProposals.map((challenge) => (
                <div className="challenges-page__item">
                  <ChallengeRequested key={challenge.id} {...challenge} />
                </div>
              ))}
            </div>
  )
}

export default MyChallenges