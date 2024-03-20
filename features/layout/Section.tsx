import React from "react";

const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full flex items-center justify-center flex-wrap">
      {children}
    </section>
  );
};

export default Section;
