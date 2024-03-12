import prisma from "@/lib/prisma";
import { resetPasswordSchema } from "@/lib/schema";
import bcrypt from "bcrypt";
export const POST = async (req: Request) => {
  const zodVerif = resetPasswordSchema.safeParse(await req.json());
  if (!zodVerif.success) {
    return new Response(zodVerif.error.message, { status: 400 });
  }
  const { newPassword, token } = zodVerif.data;
  const user = await prisma.user.findUnique({
    where: {
      resetToken: token,
    },
  });
  if (!user) {
    return new Response("No user corresponding", { status: 400 });
  }
  if (!user.resetTokenExpires || user.resetTokenExpires < new Date()) {
    return new Response("Invalid or expired token", { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      resetTokenExpires: null,
      resetToken: "",
      password: hashedPassword,
    },
  });
  return new Response("Password updated", { status: 200 });
};
