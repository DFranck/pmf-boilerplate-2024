"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
  const { data: session } = useSession();
  const words = [
    {
      text: "Text",
    },
    {
      text: "awesome",
    },
    {
      text: "for",
    },
    {
      text: "highlight",
    },
    {
      text: "App name.",
      className: "text-primary dark:text-primary",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]">
      <p className="text-secondary-foreground text-xs sm:text-base  ">
        Text to explain why to choose our app
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Button variant="outline" className="w-40 h-10 rounded-xl text-sm">
          <Link href={"mailto:qS3pG@example.com"}>Contact us</Link>
        </Button>
        {!session?.user ? (
          <Button className="w-40 h-10 rounded-xl  border text-sm" asChild>
            <Link href={"/auth/signup"}>Signup</Link>
          </Button>
        ) : (
          <Button className="w-40 h-10 rounded-xl  border text-sm" asChild>
            <Link href={"/user/dashboard"}>Dashboard</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
