// templates/CvTokyo/components/Header.tsx
import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSectionEditor } from "../../../reducers/cvSectionsSlice";
import "./cvtokyoheader.scss"
import { TbArrowBadgeRight } from "react-icons/tb";
import type { IState } from "../../../interfaces/IState";

interface HeaderProps {
  fullName: string;
  occupation: string;
  photo?: string | null;
  allowCvPhoto: boolean;
  styles: {
    photoBorder: string;
    title: string;
    profession: string;
    qr: string;
  };
}

export const CvTokyoHeader = React.forwardRef<HTMLDivElement, HeaderProps>((props, ref) => {

  const section = useSelector((state: IState) =>
      state.cvSections.sections.find((s) => s.name === "identitySection")
    );

    // Función helper al inicio del componente:
const getProgressColorClass = (progress: number) => {
  if (progress < 50) return "progress-red";
  if (progress < 100) return "progress-yellow";
  return "progress-blue";
};

    const {qrCodeUrl, allowQrCode} = useSelector((state:IState)=>state.identity)
    const {previewPopupOpen} = useSelector((state:IState)=>state.toolbarOption)
  const dispatch = useDispatch();

  const {
    fullName,
    occupation,
    photo,
    allowCvPhoto,
    styles,
  } = props;

  const hasPhotoOrQr = (allowCvPhoto && photo) || (allowQrCode);

  return (
    <div
      ref={ref}
      onClick={() => dispatch(toggleSectionEditor("identitySection"))}
      className={`cv-tokyo-header__identitySection ${hasPhotoOrQr ? "space" : "start"}`}
    >

      {
        !previewPopupOpen && section?.progress != null && <span className={`progress-indicator cv-tokyo-header__progress-indicator ${getProgressColorClass(section?.progress)}`}>
          {section?.progress}%
          <TbArrowBadgeRight className="cv-tokyo__section-arrow" />
        </span>
      }

      <div className="cv-tokyo-header__main">
        {allowCvPhoto && photo && (
        <img
          src={photo}
          alt={fullName}
          className="cv-tokyo-header__identitySection--img"
          style={{ borderColor: styles.photoBorder }}
        />
      )}

      <div className="cv-tokyo-header__identitySection--text">
        <h1 className="cv-tokyo-header__identitySection--title" style={{ color: styles.title }}>
          {fullName}
        </h1>
        <p className="cv-tokyo-header__identitySection--occupation" style={{ color: styles.profession }}>
          {occupation}
        </p>
      </div>
      </div>

      {allowQrCode && (
        <div className="cv-tokyo-header__identitySection--qr-wrapper">
          <QRCodeSVG value={qrCodeUrl} size={80} level="Q" bgColor="#ffffff" fgColor={styles.qr} />
          <p className="cv-tokyo-header__identitySection--qr-text">Ver CV Online</p>
        </div>
      )}
    </div>
  );
});