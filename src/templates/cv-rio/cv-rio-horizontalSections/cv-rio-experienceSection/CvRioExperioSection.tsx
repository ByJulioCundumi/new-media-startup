import "./cvrioexperiencesection.scss"

function CvRioExperioSection() {
  return (
    <div key="experience" className="cv-rio__experienceSection">
            <h2 className="cv-rio__experienceSection--title">Experiencia</h2>
            <div className="cv-rio__experienceSection--item">
              <div className="cv-rio__experienceSection--item-head">
                <h3 className="cv-rio__experienceSection--item-head-subtitle">
                  Desarrollador Web Backend,
                  <span className="cv-rio__experienceSection--item-head-employer">
                    Google SAS
                  </span>
                </h3>
                <p className="cv-rio__experienceSection--item-head-location">
                  Cali, Colombia
                </p>
              </div>
              <div className="cv-rio__experienceSection--item-date">
                <p className="cv-rio__experienceSection--item-date-start">
                  <span>Enero</span>
                  <span>2020</span>
                </p>
                <span>/</span>
                <p className="cv-rio__experienceSection--item-date-end">
                  {false ? "Actualidad" : `${"Febrero"} ${"2025"}`}
                </p>
              </div>
              <div className="cv-rio__experienceSection--item-date-description">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Pariatur natus quis expedita magnam ipsam quas libero beatae
                aperiam deserunt similique.
              </div>
            </div>
          </div>
  )
}

export default CvRioExperioSection