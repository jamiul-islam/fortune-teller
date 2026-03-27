import React, { forwardRef } from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ children, className = "", id }, ref) => {
    return (
      <section ref={ref} id={id} className={`min-h-screen w-full ${className}`}>
        {children}
      </section>
    );
  },
);

SectionWrapper.displayName = "SectionWrapper";

export default SectionWrapper;
