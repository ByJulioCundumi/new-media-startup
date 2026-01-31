import { useState } from "react";
import "./availablechallenges.scss";
import { mockProposals } from "../../util/challengesMock";
import ChallengeApproved from "../challenge-approved/ChallengeApproved";
import { PiListChecksLight } from "react-icons/pi";

type TabType = "approved" | "review";

const AvailableChallenges = () => {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("approved");
  const [search, setSearch] = useState("");

  const handleToggle = () => {
    if (open) {
      handleClose();
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 300);
  };

  const approvedChallenges = mockProposals.filter(
    (c) => c.status === "PROPOSAL_FUNDED"
  );

  const reviewChallenges = mockProposals.filter(
    (c) => c.status === "UNDER_EVALUATION"
  );

  const activeChallenges =
    activeTab === "approved" ? approvedChallenges : reviewChallenges;

  const filteredChallenges = activeChallenges.filter((challenge) =>
    challenge.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* BACKDROP */}
      {open && (
        <div
          className={`available-challenges__backdrop ${
            closing ? "is-exit" : ""
          }`}
          onClick={handleClose}
        />
      )}

      <div className="available-challenges">
        {/* FLOATING BUTTON */}
        <button
          className="available-challenges__button"
          onClick={handleToggle}
        >
          <PiListChecksLight />
          Retos
          <span className="available-challenges__count">
            {approvedChallenges.length}
          </span>
        </button>

        {open && (
          <div
            className={`available-challenges__popup ${
              closing ? "available-challenges__popup--exit" : ""
            }`}
          >
            {/* HEADER */}
            <div className="available-challenges__header">
              <div>
                <h4>Centro de retos</h4>
                <p>Desafíos listos para tomar o en revisión</p>
              </div>

              <button
                className="available-challenges__close"
                onClick={handleClose}
              >
                ✕
              </button>
            </div>

            {/* TOPBAR */}
            <div className="available-challenges__topbar">
              <div className="available-challenges__tabs">
                <button
                  className={`available-challenges__tab ${
                    activeTab === "approved" ? "is-active" : ""
                  }`}
                  onClick={() => setActiveTab("approved")}
                >
                  Aprobados
                  <span className="available-challenges__tab-count">
                    {approvedChallenges.length}
                  </span>
                </button>

                <button
                  className={`available-challenges__tab ${
                    activeTab === "review" ? "is-active" : ""
                  }`}
                  onClick={() => setActiveTab("review")}
                >
                  En revisión
                  <span className="available-challenges__tab-count">
                    {reviewChallenges.length}
                  </span>
                </button>
              </div>

              <div className="available-challenges__search">
                <input
                  type="text"
                  placeholder="Buscar reto…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* CONTENT */}
            <div className="available-challenges__content">
              {activeTab === "approved" && (
                <div className="available-challenges__grid">
                  {filteredChallenges.map((challenge) => (
                    <ChallengeApproved key={challenge.id} {...challenge} />
                  ))}
                </div>
              )}

              {activeTab === "review" && (
                <div className="available-challenges__empty">
                  No hay retos pendientes de revisión
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div className="available-challenges__footer">
              <button className="available-challenges__create">
                + Crear nuevo reto
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AvailableChallenges;
