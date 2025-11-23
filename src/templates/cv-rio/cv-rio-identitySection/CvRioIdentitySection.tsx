import "./cvrioidentitysection.scss"
import { QRCodeSVG } from 'qrcode.react'

function CvRioIdentitySection() {
  return (
    <div className="cv-rio__identitySection">
        <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvkhef03Xe6hgwxJvOOFeOJQT71NbRrMU34Q&s"
          }
          alt={"photo"}
          className="cv-rio__identitySection--img"
        />

        <div className="cv-rio__identitySection--text">
          <h1 className="cv-rio__identitySection--title">Juanito</h1>
          <p className="cv-rio__identitySection--occupation">
            Tecnologo en desarrollo web
          </p>
        </div>

        <div className="cv-rio__identitySection--qr-wrapper">
          <QRCodeSVG
            value={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvkhef03Xe6hgwxJvOOFeOJQT71NbRrMU34Q&s"
            }
            size={80}
            level="Q"
            bgColor="#ffffff"
          />
          <p className="cv-rio__identitySection--qr-text">Ver CV Online</p>
        </div>
      </div>
  )
}

export default CvRioIdentitySection