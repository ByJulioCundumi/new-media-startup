import ChallengeRequested from "../../components/challenge-requested/ChallengeRequested"
import { mockProposals } from "../../util/challengesMock"
import "./supportedchallenges.scss"

function SupportedChallenges() {
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

export default SupportedChallenges