import prisma from "@/lib/prisma";
import { resetPasswordSchema } from "@/lib/schema";
import bcrypt from "bcrypt";
export const POST = async (req: Request) => {
  const zodVerif = resetPasswordSchema.safeParse(await req.json());
  if (!zodVerif.success) {
    return new Response(zodVerif.error.message, { status: 400 });
  }
  const { newPassword, token } = zodVerif.data;
  console.log(newPassword, token);

  const user = await prisma.user.findUnique({
    where: {
      resetToken: token,
    },
  });
  if (!user) {
    console.log("user not found");
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }
  if (!user.resetTokenExpires || user.resetTokenExpires < new Date()) {
    console.log("token expired");
    return new Response(JSON.stringify({ message: "Token expired" }), {
      status: 400,
    });
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
  return new Response(
    JSON.stringify({ message: "Password reset successfully" }),
    { status: 200 }
  );
};
