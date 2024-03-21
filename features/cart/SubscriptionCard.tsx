import { PlanType } from "@/app/(payment)/subscribe/page";
import SubButton from "./SubButton";
const SubscriptionCard = ({ plan }: { plan: PlanType }) => (
  <div
    className={`border rounded-lg p-4 text-center ${
      plan.mostPopular ? "bg-primary/10" : ""
    }`}
  >
    <h3 className="text-2xl font-bold">{plan.name}</h3>
    <p className="text-xl my-4">{plan.price}</p>
    <ul className="mb-4">
      {plan.features.map((feature) => (
        <li key={feature} className="my-2">
          {feature}
        </li>
      ))}
    </ul>
    <SubButton plan={plan}>{plan.cta}</SubButton>
  </div>
);

export default SubscriptionCard;
