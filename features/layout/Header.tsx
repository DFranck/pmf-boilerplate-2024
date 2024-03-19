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
  return (
    <header className=" p-5 border-b-2 border-black">
      <div className="flex justify-between max-w-7xl mx-auto">
        <Link className="rounded-full" href="/">
          <Image
            className="rounded-full"
            src="/next.svg"
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
                <Button asChild>
                  <Link href="/user/profile">
                    Bonjour{" "}
                    <b>
                      {session.user.username.slice(0, 1).toUpperCase() +
                        session.user.username.slice(1)}
                    </b>
                  </Link>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => signOut()}>
                  Deconnexion
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/user/profile">Mon profil</Link>
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
