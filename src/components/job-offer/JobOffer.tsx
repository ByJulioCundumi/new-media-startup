import "./joboffer.scss";

const JobOffer = () => {

  return (
    <>
      <section className="job-offer">
        <article className="job-offer__card">
          <aside className="job-offer__action">
            <button
              className="apply-button"
            >
              Solicitar afiliación
          </button>

            <p className="job-offer__note">
              <span>Únete Gratis</span> y comienza a ganar tus comisiones
            </p>
          </aside>
        </article>
      </section>
    </>
  );
};

export default JobOffer;
