import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
const BuyButton = () => {
  return (
    <Button
      formAction={async () => {
        "use server";
        const authSession = await getServerSession();
        console.log(authSession);
        const user = await prisma.user.findUnique({
          where: {
            id: authSession?.user.id ?? "",
          },
          select: {
            stripeCustomerId: true,
          },
        });
        console.log(user);

        const stripeCustomerId = user?.stripeCustomerId ?? undefined;
        console.log(stripeCustomerId);

        const session = await stripe.checkout.sessions.create({
          customer: stripeCustomerId,
          mode: "subscription",
          payment_method_types: ["card", "link"],
          line_items: [
            {
              price:
                process.env.NODE_ENV === "development"
                  ? "price_1OuSHHP3QwKsVzo0FpZ5ZnAL"
                  : "",
            },
          ],
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/cancel`,
        });
        console.log(session);

        if (!session.url) {
          return new Response(
            JSON.stringify({ message: "Something went wrong" }),
            { status: 500 }
          );
        }
        console.log(session.url);

        redirect(session.url);
      }}
    >
      Buy
    </Button>
  );
};

export default BuyButton;
