"use client";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/features/theme/theme-provider";
import { SessionProvider } from "next-auth/react";

import React from "react";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
