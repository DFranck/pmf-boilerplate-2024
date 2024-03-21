"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../../components/ui/button";

const BuyButton: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const handleBuy = async () => {
    const authUser = session?.user;
    try {
      const res = await fetch("/api/payment/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ authUser }),
      });
      const stripSession = await res.json();
      if (stripSession.url) {
        router.push(stripSession.url);
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
