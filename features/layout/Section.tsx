import { cn } from "@/lib/utils";
import React from "react";

const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        className,
        "w-full flex items-center justify-center flex-wrap"
      )}
    >
      {children}
    </section>
  );
};

export default Section;
