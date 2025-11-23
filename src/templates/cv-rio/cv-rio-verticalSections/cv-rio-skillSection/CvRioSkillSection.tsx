import "./cvrioskillsection.scss"

function CvRioSkillSection() {
  return (
    <div key="skills" className="cv-rio__skillSection">
            <h2 className="cv-rio__skillSection--title">Habilidades</h2>
            <div className="cv-rio__skillSection--item">
              <div className="cv-rio__skillSection--header">
                <h3 className="cv-rio__skillSection--item-name">React js</h3>
                <p className="cv-rio__skillSection--item-level">Intermedio</p>
              </div>

              {/* Barra de progreso */}
              <div className="cv-rio__skillSection--progress">
                <div
                  className="cv-rio__skillSection--progress-bar"
                  style={{ width: `${40}%` }}
                ></div>
              </div>
            </div>
          </div>
  )
}

export default CvRioSkillSection