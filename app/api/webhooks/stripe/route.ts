import prisma from "@/lib/prisma";
import { findUserFormCustomerId } from "@/lib/stripe";
import Stripe from "stripe";
export const POST = async (req: Request) => {
  const body = (await req.json()) as Stripe.Event;
  console.log(body);

  switch (body.type) {
    case "checkout.session.completed": {
      const session = body.data.object as Stripe.Checkout.Session;
      const stripeCustomerId = session.customer;
      const user = await findUserFormCustomerId(stripeCustomerId);
      if (!user?.id) {
        break;
      }
      console.log(user);
      await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          plan: "SUPPORTER",
        },
      });
      console.log("Checkout session completed", session);
      break;
    }
    case "invoice.paid": {
      const invoice = body.data.object as Stripe.Invoice;
      const stripeCustomerId = invoice.customer;
      const user = await findUserFormCustomerId(stripeCustomerId);
      if (!user?.id) {
        break;
      }
      await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          plan: "SUPPORTER",
        },
      });
      console.log("Checkout session completed", invoice);
      break;
    }
    case "invoice.payment_failed": {
      const invoice = body.data.object as Stripe.Invoice;
      const stripeCustomerId = invoice.customer;
      const user = await findUserFormCustomerId(stripeCustomerId);
      if (!user?.id) {
        break;
      }
      await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          plan: "FREE",
        },
      });
      console.log("Checkout session completed", invoice);
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = body.data.object as Stripe.Subscription;
      const stripeCustomerId = subscription.customer;
      const user = await findUserFormCustomerId(stripeCustomerId);
      if (!user?.id) {
        break;
      }
      await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          plan: "FREE",
        },
      });
      console.log("Checkout session completed", subscription);
      break;
    }
    default: {
      console.log(`Unhandled event type ${body.type}`);
    }
  }
  return new Response(JSON.stringify({ message: "Success" }), { status: 200 });
};

export const GET = async () => {
  return new Response(JSON.stringify({ message: "Route du webhook Stripe" }), {
    status: 200,
  });
};
