import { mockProposals } from '../../util/challengesMock'
import ChallengeApproved from '../../components/challenge-approved/ChallengeApproved'
import "./challengepage.scss"
import ChallengeInfo from '../../components/challenge-info/ChallengeIngo'
import ConnectionsPanel from '../../components/connections-panel/ConnectionsPanel'

function ChallengePage() {
  return (
    <section className="challenge-page">
        <div className="challenge-page__left">
            {mockProposals.slice(0,3).map((challenge) => (
                <div className="challenge-page__item">
                    <div className="challenge-page__item--main">
                      <ChallengeApproved key={challenge.id} {...challenge} />
                      <div>
                        <p>Tempo restante para la entrega del video</p>
                        <p>3 Dias</p>
                      </div>
                    </div>
                    <ChallengeInfo/>
                </div>
            ))}
        </div>


    </section>
  )
}

export default ChallengePage