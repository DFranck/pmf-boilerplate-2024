import transporter from "@/lib/nodemailer";
import prisma from "@/lib/prisma";
import { forgotPasswordSchema } from "@/lib/schema";
import { randomBytes } from "crypto";
export const POST = async (req: Request) => {
  const zodVerif = forgotPasswordSchema.safeParse(await req.json());
  if (!zodVerif.success) {
    return new Response(zodVerif.error.message, { status: 400 });
  }

  const email = zodVerif.data.email;
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!existingUser) {
    return new Response("No user corresponding", { status: 400 });
  }
  const generateResetToken = () => {
    return randomBytes(32).toString("hex");
  };
  const resetToken = generateResetToken();
  const resetTokenExpires = new Date();
  resetTokenExpires.setHours(resetTokenExpires.getHours() + 1);

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      resetToken: resetToken,
      resetTokenExpires: resetTokenExpires,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Réinitialiser votre mot de passe",
    text: `${process.env.HOST_URL}/reset-password?token=${resetToken}`,
  };

  transporter
    .sendMail(mailOptions)
    .then((info: any) => {
      console.log("Email sent: " + info.response + " to: " + email);
      return new Response("Email de réinitialisation envoyé avec succès.", {
        status: 200,
      });
    })
    .catch((error: any) => {
      console.error(error);

      return new Response(
        "Une erreur s'est produite lors de l'envoi de l'email de réinitialisation.",
        { status: 500 }
      );
    });

  return new Response("Updated reset token", { status: 200 });
};
