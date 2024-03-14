"use client";

import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

const Header = () => {
  const { data: session } = useSession();
  console.log(session?.user);

  return (
    <header>
      <Button>Connexion</Button>
      <Button>Deconnexion</Button>
    </header>
  );
};

export default Header;
