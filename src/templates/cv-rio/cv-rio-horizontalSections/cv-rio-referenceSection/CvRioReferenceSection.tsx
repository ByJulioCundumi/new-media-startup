import "./cvrioreferencesection.scss"

function CvRioReferenceSection() {
  return (
    <div key="references" className="cv-rio__referenceSection">
            <h2 className="cv-rio__referenceSection--title">
              Referencias Laborales
            </h2>
            <div className="cv-rio__referenceSection--item">
              <div className="cv-rio__referenceSection--item-head">
                <p>
                  <span>Fernando Salamanca</span>,<span>Breaking Bad</span>
                </p>
              </div>
              <p className="cv-rio__referenceSection--item-phone">
                +57 154465517
              </p>
              <p className="cv-rio__referenceSection--item-email">
                fernando.salamanca@gmail.com
              </p>
            </div>
          </div>
  )
}

export default CvRioReferenceSection