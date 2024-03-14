"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

const Header = () => {
  const { data: session } = useSession();
  console.log(session?.user);

  return (
    <header>
      {session?.user && <p>Bonjour {session.user.username}</p>}
      {session?.user ? (
        <Button onClick={() => signOut()}>Deconnexion</Button>
      ) : (
        <Button>Connexion</Button>
      )}
    </header>
  );
};

export default Header;
