import "./cvtokyo.scss"

function CvTokyo() {
  const allowCvPhoto = true;
  const visible = false;

  return (
    <article className="cv-tokyo">
      {/* identitySection - horizontal fixed 
        {
            photo: string | null;
            firstName: string;
            lastName: string;
            jobTitle: string;
            allowCvPhoto: boolean;
        }
      */}
      <div className="cv-tokyo__identitySection">
        {
          allowCvPhoto && <img src="" alt="" className="cv-tokyo__identitySection--img" />
        }
        <div className="cv-tokyo__identitySection--text">
          <h1 className="cv-tokyo__identitySection--title">
            Juan Eduardo Salazar Mendoza
          </h1>
          <p className="cv-tokyo__identitySection--occupation">
            Desarrollador web
          </p>
        </div>
      </div>

      <div className="cv-tokyo__split">
        <div className="cv-tokyo__split--vertical">
          {/* contactSection - vertical 
            [
              {
                id: string;
                type: string;     
                value: string; 
              }
            ]
          */}
          <div className="cv-tokyo__contactSection">
              <h2 className="cv-tokyo__contactSection--title">
                Contacto
              </h2>
            <div className="cv-tokyo__contactSection--item">
              <h3 className="cv-tokyo__contactSection--item-name">
                Telefono
              </h3>
              <p className="cv-tokyo__contactSection--item-value">
                +57 3251457845
              </p>
            </div>
            <div className="cv-tokyo__contactSection--item">
              <h3 className="cv-tokyo__contactSection--item-name">
                Email
              </h3>
              <p className="cv-tokyo__contactSection--item-value">
                juan.dev@gmail.com
              </p>
            </div>
          </div>

          {/* personalInfoSection - vertical 
            [
              {
                id: string;
                name: string;
                value: string;
              }
            ]
          */}
          <div className="cv-tokyo__personalInfoSection">
              <h2 className="cv-tokyo__personalInfoSection--title">
                Detalles
              </h2>
            <div className="cv-tokyo__personalInfoSection--item">
              <h3 className="cv-tokyo__personalInfoSection--item-name">
                Ubicacion
              </h3>
              <p className="cv-tokyo__personalInfoSection--item-value">
                Cali, Colombia
              </p>
            </div>
            <div className="cv-tokyo__personalInfoSection--item">
              <h3 className="cv-tokyo__personalInfoSection--item-name">
                Nacionalidad
              </h3>
              <p className="cv-tokyo__personalInfoSection--item-value">
                Colombiano
              </p>
            </div>
          </div>

          {/* skillSection - vertical 
            [
              {
                id: string;
                name: string;
                level: "Principiante" | "Intermedio" | "Bueno" | "Alto" | "Experto";
              }
            ]
          */}
          <div className="cv-tokyo__skillSection">
              <h2 className="cv-tokyo__skillSection--title">
                Habilidades
              </h2>
            <div className="cv-tokyo__skillSection--item">
              <h3 className="cv-tokyo__skillSection--item-name">
                React js
              </h3>
              <p className="cv-tokyo__skillSection--item-level">
                Intermedio
              </p>
            </div>
            <div className="cv-tokyo__skillSection--item">
              <h3 className="cv-tokyo__skillSection--item-name">
                Node js
              </h3>
              <p className="cv-tokyo__skillSection--item-value">
                Intermedio
              </p>
            </div>
          </div>

          {/* languageSection - vertical 
            [
              {
                id: string;
                name: string;
                level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Nativo";
              }
            ]
          */}
          <div className="cv-tokyo__languajeSection">
              <h2 className="cv-tokyo__languajeSection--title">
                Idiomas
              </h2>
            <div className="cv-tokyo__languajeSection--item">
              <h3 className="cv-tokyo__languajeSection--item-name">
                Español
              </h3>
              <p className="cv-tokyo__languajeSection--item-level">
                Nativo
              </p>
            </div>
            <div className="cv-tokyo__languajeSection--item">
              <h3 className="cv-tokyo__languajeSection--item-name">
                Ingles
              </h3>
              <p className="cv-tokyo__languajeSection--item-level">
                B1
              </p>
            </div>
          </div>

          {/* linkSection - vertical 
            [
              {
                id: string;
                name: string;
                url: string;
                visible: boolean; 
              }
            ]
          */}
          <div className="cv-tokyo__linkSection">
              <h2 className="cv-tokyo__linkSection--title">
                Enlaces
              </h2>
            <div className="cv-tokyo__linkSection--item">
              {
                visible ? 
                <h3 className="cv-tokyo__linkSection--item-name">
                  Portafolio
                </h3>
                :
                <a href="" className="cv-tokyo__linkSection--item-url">
                  Portafolio
                </a>
              }
              {
                visible === false &&
                <p className="cv-tokyo__linkSection--item-text-url">
                  https://www.deepl.com/es/translator
                </p>
              }
            </div>
            <div className="cv-tokyo__linkSection--item">
              {
                visible ? 
                <h3 className="cv-tokyo__linkSection--item-name">
                  Youtube
                </h3>
                :
                <a href="" className="cv-tokyo__linkSection--item-url">
                  Youtube
                </a>
              }
              {
                visible === false &&
                <p className="cv-tokyo__linkSection--item-text-url">
                  https://www.deepl.com/es/translator
                </p>
              }
            </div>
          </div>

          {/* hobbieSection - vertical 
            [{
              id: string;
              name: string;
            }]
          */}
          <div className="cv-tokyo__hobbieSection">
              <h2 className="cv-tokyo__hobbieSection--title">
                Pasatiempos
              </h2>
            <div className="cv-tokyo__hobbieSection--item">
              <p className="cv-tokyo__hobbieSection--item-name">
                Lectura
              </p>
            </div>
          </div>
        </div>

        <div className="cv-tokyo__split--horizontal">
          {/* profileSection - horizontal 
            String -> html
          */}
          <div className="cv-tokyo__profileSection">
            <h2 className="cv-tokyo__profileSection--title">
              Perfil
            </h2>
            <div className="cv-tokyo__profileSection--item">
              Lorem ipsum dolor, sit amet consectetur adipisicing 
              elit. Nam, in? Necessitatibus aliquam minus error quidem 
              repellendus, nam officia ad ex!
            </div>
          </div>

          {/* experienceSection - horizontal 
            [
              {
                id: string;
                position: string;
                employer: string;
                location: string;
                startMonth: string;
                startYear: string;
                endMonth?: string;
                endYear?: string;
                present: boolean;
                description: string;
              }
            ]
          */}
          <div className="cv-tokyo__experienceSection">
            <h2 className="cv-tokyo__experienceSection--title">
              Experiencia
            </h2>
            <div className="cv-tokyo__experienceSection--item">
              <div className="cv-tokyo__experienceSection--item-head">
                <h3 className="cv-tokyo__experienceSection--item-head-subtitle">
                  {/* position */}
                  Programador FullStack
                  {/* employer */}
                  Platzi
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </article>
  )
}

export default CvTokyo