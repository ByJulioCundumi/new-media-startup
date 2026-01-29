import { mockProposals } from '../../util/challengesMock'
import ChallengeApproved from '../../components/challenge-approved/ChallengeApproved'
import "./challengepage.scss"
import ChallengeInfo from '../../components/challenge-info/ChallengeIngo'

function ChallengePage() {
  return (
    <section className="challenge-page">
        <div className="challenge-page__left">
            {mockProposals.slice(0,3).map((challenge) => (
                <ChallengeApproved key={challenge.id} {...challenge} />
            ))}
        </div>

        <div className="challenge-page__right">
            <ChallengeInfo/>
        </div>
    </section>
  )
}

export default ChallengePage