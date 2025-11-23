// components/PaginatedCvLayout.tsx
import React, { useEffect, useRef, useState } from "react";

const PAGE_HEIGHT = 297 * 3.78; // Conversión mm → px para 96dpi

export const PaginatedCvLayout = ({ header, children }) => {
  const containerRef = useRef(null);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const sections = Array.from(containerRef.current.children);

    let currentPage = [];
    let currentHeight = 0;
    const pagesGenerated = [];

    sections.forEach((section) => {
      const h = section.getBoundingClientRect().height;

      if (currentHeight + h > PAGE_HEIGHT) {
        pagesGenerated.push(currentPage);
        currentPage = [];
        currentHeight = 0;
      }

      currentPage.push(section);
      currentHeight += h;
    });

    if (currentPage.length > 0) pagesGenerated.push(currentPage);

    setPages(pagesGenerated);
  }, [children]);

  return (
    <div className="cv-root">
      <div ref={containerRef} style={{ visibility: "hidden", position: "absolute" }}>
        {children}
      </div>

      {pages.map((pageSections, index) => (
        <article key={index} className="cv-page">
          {header}
          <div className="cv-content">
            {pageSections.map((sec, i) => React.cloneElement(sec))}
          </div>
        </article>
      ))}
    </div>
  );
};
