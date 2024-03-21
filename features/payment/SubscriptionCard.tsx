import SubButton from "./SubButton";
export type PlanType = {
  name: string;
  price: string;
  features: string[];
  cta: string;
  mostPopular: boolean;
};
export const plans = [
  {
    name: "Basique",
    price: "9.99€",
    features: ["Fonctionnalité 1", "Fonctionnalité 2", "Support par email"],
    cta: "Choisir Basique",
    mostPopular: false,
  },
  {
    name: "Professionnel",
    price: "29.99€",
    features: [
      "Toutes les fonctionnalités Basiques",
      "Fonctionnalité Avancée 1",
      "Support prioritaire",
    ],
    cta: "Choisir Professionnel",
    mostPopular: true,
  },
  {
    name: "Entreprise",
    price: "99.99€",
    features: [
      "Toutes les fonctionnalités Professionnelles",
      "Fonctionnalité Avancée 2",
      "Support 24/7",
    ],
    cta: "Choisir Entreprise",
    mostPopular: false,
  },
];
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
