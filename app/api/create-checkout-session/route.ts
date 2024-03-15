import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
export const POST = async (req: Request) => {
  console.log("Checkout session called");
  const body = await req.json();
  const userId = parseInt(body.authUser.id);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeCustomerId: true,
    },
  });
  try {
    const stripSession = await stripe.checkout.sessions.create({
      customer: user?.stripeCustomerId ?? undefined,
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price:
            process.env.NODE_ENV === "development"
              ? "price_1OuSHHP3QwKsVzo0FpZ5ZnAL"
              : "",
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
    console.log(stripSession.url);
    return new Response(JSON.stringify(stripSession));
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    return new Response(JSON.stringify({ error: err.message }));
  }
};
