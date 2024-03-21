import Stripe from "stripe";
import prisma from "./prisma";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2023-10-16",
  typescript: true,
});

export const findUserFormCustomerId = async (stripeCustomerId: unknown) => {
  if (typeof stripeCustomerId !== "string") {
    return null;
  }
  return prisma.user.findFirst({
    where: {
      stripeCustomerId,
    },
  });
};
