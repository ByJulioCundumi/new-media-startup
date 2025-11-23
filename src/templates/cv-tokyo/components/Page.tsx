// templates/CvTokyo/components/Page.tsx
import React from "react";
import { Header } from "./Header";

interface PageProps {
  pageIndex: number;
  totalPages: number;
  headerProps: any;
  headerRef?: React.Ref<HTMLDivElement>;
  leftContent: React.ReactNode[];
  rightContent: React.ReactNode[];
}

export const Page: React.FC<PageProps> = ({
  pageIndex,
  totalPages,
  headerProps,
  headerRef,
  leftContent,
  rightContent,
}) => {
  return (
    <div className="cv-tokyo__page">
      <Header ref={headerRef} {...headerProps} />

      <div className="cv-tokyo__split">
        <div className="cv-tokyo__split--vertical">
          {leftContent.map((el, i) => (
            <React.Fragment key={i}>{el}</React.Fragment>
          ))}
        </div>

        <div className="cv-tokyo__split--horizontal">
          {rightContent.map((el, i) => (
            <React.Fragment key={i}>{el}</React.Fragment>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="cv-tokyo__page-number">
          Página {pageIndex + 1} de {totalPages}
        </div>
      )}

      {pageIndex < totalPages - 1 && (
        <div className="cv-tokyo__next-page">
          <span className="cv-tokyo__next-page-text">Página {pageIndex + 2}</span>
        </div>
      )}
    </div>
  );
};