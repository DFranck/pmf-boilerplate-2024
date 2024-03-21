"use client";
import { PlanType } from "@/app/(payment)/subscribe/page";
import { Button } from "@/components/ui/button";
const SubButton = ({
  children,
  plan,
}: {
  children: React.ReactNode;
  plan: PlanType;
}) => {
  const handleClick = (plan: PlanType) => {
    console.log(plan.price);
  };
  return <Button onClick={() => handleClick(plan)}>{children}</Button>;
};

export default SubButton;
