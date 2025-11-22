// templates/CvRio.tsx
import React from "react";
import { QRCodeSVG } from "qrcode.react";
import "./cvrio.scss"; // ← Crea este archivo con tus estilos (cv-rio__)

export const CvRio: React.FC = () => {
                      
  return (
    <article className="cv-rio">

        {/* header fijo - identitySection */}
        <div className="cv-rio__identitySection">
            <img
                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvkhef03Xe6hgwxJvOOFeOJQT71NbRrMU34Q&s"}
                alt={"photo"}
                className="cv-rio__identitySection--img"
              />
        
            <div className="cv-rio__identitySection--text">
              <h1 className="cv-rio__identitySection--title">
                Juanito
              </h1>
              <p className="cv-rio__identitySection--occupation">
                Tecnologo en desarrollo web
              </p>
            </div>
        
            <div className="cv-rio__identitySection--qr-wrapper">
                <QRCodeSVG value={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvkhef03Xe6hgwxJvOOFeOJQT71NbRrMU34Q&s"} size={80} level="Q" bgColor="#ffffff"/>
                <p className="cv-rio__identitySection--qr-text">Ver CV Online</p>
            </div>
          </div>

          {/* Split vertical - Horizontal */}
          <div className="cv-rio__split">

            {/* Split vertical - Horizontal */}
            <div className="cv-rio__split--vertical">

              {/* Split vertical - personalInfoSection */}
              <div className="cv-rio__personalInfoSection">
                <h2 className="cv-rio__personalInfoSection--title">
                  Detalles
                </h2>
                    <div  className="cv-rio__personalInfoSection--item">
                        <h3 className="cv-rio__personalInfoSection--item-name">Direccion</h3>
                        <p className="cv-rio__personalInfoSection--item-value">Calle #131 diagonal 27p</p>
                      </div>
              </div>

              {/* Split vertical - seccion contact */}
              <div className={`cv-rio__contactSection`}>
                <h2 className="cv-rio__contactSection--title">
                  Contacto
                </h2>
                <div className="cv-rio__contactSection--item">
                        <h3 className="cv-rio__contactSection--item-name" >Telefono</h3>
                        <p className="cv-rio__contactSection--item-value">+57 546115745</p>
                </div>
              </div>

              {/* Split vertical - linkSection */}
              <div key="links" className="cv-rio__linkSection">
          <h2 className="cv-rio__linkSection--title">
            Enlaces
          </h2>
                <div className="cv-rio__linkSection--item">
                    {/* SI visible → nombre como <a> + URL debajo */}
                    {true ? (
                      <>
                        <a
                          href={"https://upload.wikimedia.org/wikipedia/commons/a/a0/Andrzej_Person_Kancelaria_Senatu.jpg"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cv-rio__linkSection--item-name"
                        >
                          Portafolio
                        </a>

                        <p className="cv-rio__linkSection--item-url">
                          {"https://upload.wikimedia.org/wikipedia/commons/a/a0/Andrzej_Person_Kancelaria_Senatu.jpg"}
                        </p>
                      </>
                    ) : (
                      /* SI NO visible → solo <a> con el nombre */
                      <a
                        href={"https://upload.wikimedia.org/wikipedia/commons/a/a0/Andrzej_Person_Kancelaria_Senatu.jpg"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cv-rio__linkSection--item-name"
                      >
                        Portafolio
                      </a>
                    )}
                  </div>
        </div>

              {/* Split vertical - skillSection */}
              <div key="skills" className="cv-rio__skillSection">
                <h2 className="cv-rio__skillSection--title">
                  Habilidades
                </h2>
                  <div className="cv-rio__skillSection--item">
                          <div className="cv-rio__skillSection--header">
                            <h3 className="cv-rio__skillSection--item-name" >React js</h3>
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

              {/* Split vertical - languageSection */}
              <div key="languages" className="cv-rio__languajeSection">
          <h2 className="cv-rio__languajeSection--title">
            Idiomas
          </h2>

             <div  className="cv-rio__languajeSection--item">
                    <div className="cv-rio__languajeSection--header">
                      <h3 className="cv-rio__languajeSection--item-name">Español</h3>
                      <p className="cv-rio__languajeSection--item-level">C2</p>
                    </div>

                    {/* Barra de progreso */}
                    <div className="cv-rio__languajeSection--progress">
                      <div
                        className="cv-rio__languajeSection--progress-bar"
                        style={{ width: `${90}%` }}
                      ></div>
                    </div>
                  </div>
        </div>

              {/* Split vertical - hobbieSection */}
              <div key="hobbies" className="cv-rio__hobbieSection">
          <h2 className="cv-rio__hobbieSection--title">
            Pasatiempos
          </h2>

              <div className="cv-rio__hobbieSection--list">
                <span className="cv-rio__hobbieSection--item">
                    Lectura
                  </span>
              </div>
        </div>
            </div>

            {/* Split horizontal */}
            <div className="cv-rio__split--horizontal">
              
              {/* Split horizontal - profileSection */}
              <div key="profile" className="cv-rio__profileSection">
          <h2 className="cv-rio__profileSection--title">
            Perfil
          </h2>
          <div className="cv-rio__profileSection--item">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ipsam 
            incidunt ut commodi, aliquam earum excepturi maxime quam. Quam, blanditiis.
          </div>
        </div>

        {/* Split horizontal - experienceSection */}
        <div key="experience" className="cv-rio__experienceSection">
          <h2 className="cv-rio__experienceSection--title">
            Experiencia
          </h2>
             <div className="cv-rio__experienceSection--item">
                  <div className="cv-rio__experienceSection--item-head">
                    <h3 className="cv-rio__experienceSection--item-head-subtitle">
                      Desarrollador Web Backend,
                      <span className="cv-rio__experienceSection--item-head-employer">Google SAS</span>
                    </h3>
                    <p className="cv-rio__experienceSection--item-head-location">Cali, Colombia</p>
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
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur natus quis 
                    expedita magnam ipsam quas libero beatae aperiam deserunt similique.
                  </div>
                </div>
        </div>

        {/* Split horizontal - educationSection */}
        <div key="education" className="cv-rio__educationSection">
          <h2 className="cv-rio__educationSection--title">
            Educación
          </h2>
            <div className="cv-rio__educationSection--item">
                  <div className="cv-rio__educationSection--item-head">
                    <h3 className="cv-rio__educationSection--item-head-subtitle">
                      Ingenieria De Sistemas,
                      <span className="cv-rio__educationSection--item-head-employer">Universidad Nacional De Colombia</span>
                    </h3>
                    <p className="cv-rio__educationSection--item-head-location">Bogota, Colombia</p>
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
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur vel voluptates 
                      quibusdam officia et reiciendis in. Ab error dolorum at.
                    </div>
                  )}
                </div>
        </div>

        {/* Split horizontal - courseSection */}
        <div key="courses" className="cv-rio__courseSection">
          <h2 className="cv-rio__courseSection--title">
            Cursos
          </h2>
              <div className="cv-rio__courseSection--item">
                  <div className="cv-rio__courseSection--item-head">
                    <h3 className="cv-rio__courseSection--item-head-subtitle">
                      Java de cero a experto,
                      <span className="cv-rio__courseSection--item-head-employer">Udemy</span>
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
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolorem necessitatibus 
                      facere eligendi cupiditate animi eos quos quod pariatur at.
                    </div>
                  )}
                </div>
        </div>

        {/* Split horizontal - awardSection */}
        <div key="awards" className="cv-rio__awardSection">
          <h2 className="cv-rio__awardSection--title">
            Premios
          </h2>
             <div className="cv-rio__awardSection--item">
                  <h3 className="cv-rio__awardSection--item-subtitle">Programador estrella</h3>
                  <p className="cv-rio__awardSection--item-date">Marzo, 2025</p>
                  {true && (
                    <div className="cv-rio__awardSection--item-date-description">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta porro qui vel, 
                      quia natus officia provident ullam fuga doloribus quos.
                    </div>
                  )}
                </div>
        </div>

        {/* Split horizontal - referenceSection */}
        <div key="references" className="cv-rio__referenceSection">
          <h2 className="cv-rio__referenceSection--title">
            Referencias Laborales
          </h2>
            <div className="cv-rio__referenceSection--item">
                  <div className="cv-rio__referenceSection--item-head">
                    <p>
                      <span>Fernando Salamanca</span>,
                      <span>Breaking Bad</span>
                    </p>
                  </div>
                  <p className="cv-rio__referenceSection--item-phone">+57 154465517</p>
                  <p className="cv-rio__referenceSection--item-email">fernando.salamanca@gmail.com</p>
                </div>
        </div>

        {/* Split horizontal - profileSection */}
        <div className="cv-rio__customSection">
          <h2 className="cv-rio__customSection--title">
                Campo Personalizado
              </h2>
              <div className="cv-rio__customSection--item">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum doloribus consequatur blanditiis? 
                Officiis earum, assumenda nulla cumque placeat nobis totam!
              </div>
              </div>

            </div>
          </div>

    </article>
  );
};

export default CvRio;