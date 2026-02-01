import "./joboffer.scss";

const JobOffer = () => {

  return (
    <>
      <section className="job-offer">
        <aside className="job-offer__action">
            <button
              className="apply-button"
            >
              Solicitar afiliación
          </button>

            <p className="job-offer__note">
              <strong>Únete Gratis</strong> <span>a nuestro programa de afiliados</span>
            </p>
          </aside>
      </section>
    </>
  );
};

export default JobOffer;
