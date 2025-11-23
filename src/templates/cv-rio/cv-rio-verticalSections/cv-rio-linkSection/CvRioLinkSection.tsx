import "./cvriolinksection.scss"

function CvRioLinkSection() {
  return (
    <div key="links" className="cv-rio__linkSection">
            <h2 className="cv-rio__linkSection--title">Enlaces</h2>
            <div className="cv-rio__linkSection--item">
              {/* SI visible → nombre como <a> + URL debajo */}
              {true ? (
                <>
                  <a
                    href={
                      "https://upload.wikimedia.org/wikipedia/commons/a/a0/Andrzej_Person_Kancelaria_Senatu.jpg"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cv-rio__linkSection--item-name"
                  >
                    Portafolio
                  </a>

                  <p className="cv-rio__linkSection--item-url">
                    {
                      "https://upload.wikimedia.org/wikipedia/commons/a/a0/Andrzej_Person_Kancelaria_Senatu.jpg"
                    }
                  </p>
                </>
              ) : (
                /* SI NO visible → solo <a> con el nombre */
                <a
                  href={
                    "https://upload.wikimedia.org/wikipedia/commons/a/a0/Andrzej_Person_Kancelaria_Senatu.jpg"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cv-rio__linkSection--item-name"
                >
                  Portafolio
                </a>
              )}
            </div>
          </div>
  )
}

export default CvRioLinkSection