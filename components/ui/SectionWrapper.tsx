import React, { forwardRef } from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ children, className = "", id, style }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={`min-h-screen w-full ${className}`}
        style={style}
      >
        {children}
      </section>
    );
  },
);

SectionWrapper.displayName = "SectionWrapper";

export default SectionWrapper;
