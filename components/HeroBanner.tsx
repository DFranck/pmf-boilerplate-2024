"use client";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { SparklesCore } from "./ui/sparkles";

export function HeroBanner() {
  const { data: session } = useSession();
  const { theme, systemTheme } = useTheme();
  const [particleColor, setParticleColor] = useState("#ffffff");

  useEffect(() => {
    theme !== "system"
      ? setParticleColor(theme === "dark" ? "#ffffff" : "#000000")
      : systemTheme === "dark"
      ? setParticleColor("#ffffff")
      : setParticleColor("#000000");
  }, [theme, systemTheme]);
  return (
    <div className="h-[40rem] w-full bg-background flex flex-col items-center justify-center overflow-hidden relative">
      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-seconary relative z-20">
        APP NAME
      </h1>
      <h2 className="md:text-1xl text-1xl lg:text-4xl font-bold text-center text-seconary relative z-20">
        App slogan
      </h2>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-primary to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={500}
          className="w-full h-full"
          particleColor={particleColor}
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 flex justify-center items-center z-10">
          {!session?.user && (
            <Button asChild variant={"default"}>
              <Link href="/auth/signup">Signup</Link>
            </Button>
          )}
        </div>
        <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/hero-background.webp"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
    </div>
  );
}
