import "./cvrioeductionsection.scss"

function CvRioEducationSection() {
  return (
    <div key="education" className="cv-rio__educationSection">
            <h2 className="cv-rio__educationSection--title">Educación</h2>
            <div className="cv-rio__educationSection--item">
              <div className="cv-rio__educationSection--item-head">
                <h3 className="cv-rio__educationSection--item-head-subtitle">
                  Ingenieria De Sistemas,
                  <span className="cv-rio__educationSection--item-head-employer">
                    Universidad Nacional De Colombia
                  </span>
                </h3>
                <p className="cv-rio__educationSection--item-head-location">
                  Bogota, Colombia
                </p>
              </div>
              <div className="cv-rio__educationSection--item-date">
                <p className="cv-rio__educationSection--item-date-start">
                  <span>Junio</span>
                  <span>2021</span>
                </p>
                <span>/</span>
                <p className="cv-rio__educationSection--item-date-end">
                  {false ? "Actualidad" : `${"Septiembre"} ${"2025"}`}
                </p>
              </div>
              {false && (
                <div className="cv-rio__educationSection--item-date-description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequuntur vel voluptates quibusdam officia et reiciendis
                  in. Ab error dolorum at.
                </div>
              )}
            </div>
          </div>
  )
}

export default CvRioEducationSection