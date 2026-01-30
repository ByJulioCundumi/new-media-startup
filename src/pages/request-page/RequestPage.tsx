import ChallengeApproved from "../../components/challenge-approved/ChallengeApproved"
import CreateChallengeProposal from "../../components/create-challenge-proposal/CreateChallengeProposal"
import { mockProposals } from "../../util/challengesMock"
import "./requestpage.scss"

function RequestPage() {
  return (
    <section className="request-page">
        <div className="request-page__container">
          {mockProposals.map((challenge) => (
            <ChallengeApproved key={challenge.id} {...challenge} />
          ))}
        </div>

        <div className="request-page__request">
          <CreateChallengeProposal/>
        </div>
    </section>
  )
}

export default RequestPage