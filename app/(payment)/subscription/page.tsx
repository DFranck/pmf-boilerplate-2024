import Main from "@/features/layout/Main";
import Section from "@/features/layout/Section";
import SubscriptionCard, { plans } from "@/features/payment/SubscriptionCard";
const subscription = () => {
  return (
    <Main className="h-full">
      <Section className="py-16 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Plans d&apos;abonnement
        </h1>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <SubscriptionCard key={plan.name} plan={plan} />
          ))}
        </div>
      </Section>
    </Main>
  );
};

export default subscription;
