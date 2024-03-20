import React from "react";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col items-center justify-center">
      {children}
    </main>
  );
};

export default Main;
