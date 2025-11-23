import "./cvrioawardsection.scss"

function CvRioAwardSection() {
  return (
    <div key="awards" className="cv-rio__awardSection">
            <h2 className="cv-rio__awardSection--title">Premios</h2>
            <div className="cv-rio__awardSection--item">
              <h3 className="cv-rio__awardSection--item-subtitle">
                Programador estrella
              </h3>
              <p className="cv-rio__awardSection--item-date">Marzo, 2025</p>
              {true && (
                <div className="cv-rio__awardSection--item-date-description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta porro qui vel, quia natus officia provident ullam fuga
                  doloribus quos.
                </div>
              )}
            </div>
          </div>
  )
}

export default CvRioAwardSection