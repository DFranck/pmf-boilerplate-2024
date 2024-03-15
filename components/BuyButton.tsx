"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";

const BuyButton: React.FC = () => {
  const { data: session } = useSession();
  const handleBuy = async () => {
    const authUser = session?.user;
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ authUser }),
      });
      const session = await res.json();
      if (session.url) {
        window.location.href = session.url;
      } else {
        console.error("La session Stripe n’a pas retourné d’URL.");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la création de la session de paiement Stripe:",
        error
      );
    }
  };

  return <Button onClick={handleBuy}>Acheter</Button>;
};

export default BuyButton;
