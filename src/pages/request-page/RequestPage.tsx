import ChallengeRequested from "../../components/challenge-requested/ChallengeRequested"
import ConnectionsPanel from "../../components/connections-panel/ConnectionsPanel"
import CreateChallengeProposal from "../../components/create-challenge-proposal/CreateChallengeProposal"
import { mockProposals } from "../../util/challengesMock"
import "./requestpage.scss"

function RequestPage() {
  return (
    <section className="request-page">
        <div className="request-page__request">
          <ConnectionsPanel/>
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