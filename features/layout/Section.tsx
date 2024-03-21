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
        "flex items-center justify-center flex-wrap w-full"
      )}
    >
      {children}
    </section>
  );
};

export default Section;
