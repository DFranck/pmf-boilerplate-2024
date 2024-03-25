"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { ModeToggle } from "../theme/ModeToggle";

const Header = () => {
  const { data: session } = useSession();
  // console.log(session);
  if (!session) {
    console.log("no session");
  } else {
    console.log(session);
  }

  return (
    <header className=" p-2 border-b border-border">
      <div className="flex justify-between max-w-7xl mx-auto">
        <Link className="rounded-full hover:opacity-80" href="/">
          <Image
            className="rounded-full"
            src="/icon.png"
            alt="logo"
            width={75}
            height={75}
            priority
          />
        </Link>
        <div className="flex justify-center items-center gap-5">
          <ModeToggle />
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant={"default"} asChild>
                  <Link href="/user/profile">
                    <b>
                      {session.user.username.slice(0, 1).toUpperCase() +
                        session.user.username.slice(1)}
                    </b>
                  </Link>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/user/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/subscription">subscription / </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/api/auth/signin">Connexion</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
