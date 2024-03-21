"use client";
import { Button } from "@/components/ui/button";
import { PlanType } from "./SubscriptionCard";
const SubButton = ({
  children,
  plan,
}: {
  children: React.ReactNode;
  plan: PlanType;
}) => {
  const handleClick = (plan: PlanType) => {
    console.log("Logique de souscription ici :SubButton.tsx", plan.price);
  };
  return <Button onClick={() => handleClick(plan)}>{children}</Button>;
};

export default SubButton;
