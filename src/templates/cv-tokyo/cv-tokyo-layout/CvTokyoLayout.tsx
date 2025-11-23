// templates/CvTokyo/components/Page.tsx
import React from "react";
import { CvTokyoHeader } from "../cv-tokyo-header/CvTokyoHeader";
import "./cvtokyolayout.scss"

interface PageProps {
  pageIndex: number;
  totalPages: number;
  headerProps: any;
  headerRef?: React.Ref<HTMLDivElement>;
  leftContent: React.ReactNode[];
  rightContent: React.ReactNode[];
}

export const CvTokyoLayout: React.FC<PageProps> = ({
  pageIndex,
  totalPages,
  headerProps,
  headerRef,
  leftContent,
  rightContent,
}) => {
  return (
    <div className="cv-tokyo-layout__page">
      <CvTokyoHeader ref={headerRef} {...headerProps} />

      <div className="cv-tokyo-layout__split">
        <div className="cv-tokyo-layout__split--vertical">
          {leftContent.map((el, i) => (
            <React.Fragment key={i}>{el}</React.Fragment>
          ))}
        </div>

        <div className="cv-tokyo-layout__split--horizontal">
          {rightContent.map((el, i) => (
            <React.Fragment key={i}>{el}</React.Fragment>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="cv-tokyo-layout__page-number">
          Página {pageIndex + 1} de {totalPages}
        </div>
      )}

      {pageIndex < totalPages - 1 && (
        <div className="cv-tokyo-layout__next-page">
          <span className="cv-tokyo-layout__next-page-text">Página {pageIndex + 2}</span>
        </div>
      )}
    </div>
  );
};