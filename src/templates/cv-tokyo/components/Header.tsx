// templates/CvTokyo/components/Header.tsx
import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { useDispatch } from "react-redux";
import { toggleSectionEditor } from "../../../reducers/cvSectionsSlice";

interface HeaderProps {
  fullName: string;
  occupation: string;
  photo?: string | null;
  allowCvPhoto: boolean;
  onlineCvUrl: string;
  allowCvQr: boolean;
  styles: {
    photoBorder: string;
    title: string;
    profession: string;
    qr: string;
  };
  headerRef?: React.Ref<HTMLDivElement>;
}

export const Header = React.forwardRef<HTMLDivElement, HeaderProps>((props, ref) => {
  const dispatch = useDispatch();

  const {
    fullName,
    occupation,
    photo,
    allowCvPhoto,
    onlineCvUrl,
    allowCvQr,
    styles,
  } = props;

  const hasPhotoOrQr = (allowCvPhoto && photo) || (allowCvQr && onlineCvUrl);

  return (
    <div
      ref={ref}
      onClick={() => dispatch(toggleSectionEditor("identitySection"))}
      className={`cv-tokyo__identitySection ${hasPhotoOrQr ? "space" : "start"}`}
    >
      {allowCvPhoto && photo && (
        <img
          src={photo}
          alt={fullName}
          className="cv-tokyo__identitySection--img"
          style={{ borderColor: styles.photoBorder }}
        />
      )}

      <div className="cv-tokyo__identitySection--text">
        <h1 className="cv-tokyo__identitySection--title" style={{ color: styles.title }}>
          {fullName}
        </h1>
        <p className="cv-tokyo__identitySection--occupation" style={{ color: styles.profession }}>
          {occupation}
        </p>
      </div>

      {allowCvQr && onlineCvUrl && (
        <div className="cv-tokyo__identitySection--qr-wrapper">
          <QRCodeSVG value={onlineCvUrl} size={80} level="Q" bgColor="#ffffff" fgColor={styles.qr} />
          <p className="cv-tokyo__identitySection--qr-text">Ver CV Online</p>
        </div>
      )}
    </div>
  );
});