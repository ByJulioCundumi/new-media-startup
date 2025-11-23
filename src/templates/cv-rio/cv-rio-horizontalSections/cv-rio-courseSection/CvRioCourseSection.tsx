import "./cvriocourseSection.scss"

function CvRioCourseSection() {
  return (
    <div key="courses" className="cv-rio__courseSection">
            <h2 className="cv-rio__courseSection--title">Cursos</h2>
            <div className="cv-rio__courseSection--item">
              <div className="cv-rio__courseSection--item-head">
                <h3 className="cv-rio__courseSection--item-head-subtitle">
                  Java de cero a experto,
                  <span className="cv-rio__courseSection--item-head-employer">
                    Udemy
                  </span>
                </h3>
                <p className="cv-rio__courseSection--item-head-location">
                  Cali, Colombia
                </p>
              </div>
              <div className="cv-rio__courseSection--item-date">
                <p className="cv-rio__courseSection--item-date-start">
                  <span>Enero, 2020</span>
                </p>
                <span>/</span>
                <p className="cv-rio__courseSection--item-date-end">
                  Febrero, 2020
                </p>
              </div>
              {true && (
                <div className="cv-rio__courseSection--item-date-description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis dolorem necessitatibus facere eligendi cupiditate
                  animi eos quos quod pariatur at.
                </div>
              )}
            </div>
          </div>
  )
}

export default CvRioCourseSection