"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/ui/button";

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
          />
        </Link>
        <div className="flex justify-center items-center gap-5">
          {session?.user && (
            <Link href="/user/profile">
              Bonjour{" "}
              <b>
                {session.user.username.slice(0, 1).toUpperCase() +
                  session.user.username.slice(1)}
              </b>
            </Link>
          )}
          {session?.user ? (
            <Button onClick={() => signOut()}>Deconnexion</Button>
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
