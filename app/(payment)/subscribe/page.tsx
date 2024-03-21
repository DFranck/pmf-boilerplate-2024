import BuyButton from "@/features/cart/BuyButton";
import SubscriptionCard from "@/features/cart/SubscriptionCard";
import Main from "@/features/layout/Main";
import Section from "@/features/layout/Section";

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
const Subscribe = () => {
  return (
    <Main>
      <Section className="py-16 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Plans d&apos;abonnement
        </h1>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <SubscriptionCard key={plan.name} plan={plan} />
          ))}
        </div>
        <BuyButton />
      </Section>
    </Main>
  );
};

export default Subscribe;
