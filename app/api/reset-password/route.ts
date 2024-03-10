import prisma from "@/lib/prisma";
import { resetPasswordSchema } from "@/lib/schema";
export const POST = async (req: Request) => {
  const zodVerif = resetPasswordSchema.safeParse(await req.json());
  console.log(zodVerif);

  return new Response("reset password", { status: 404 });
};

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  if (!token) {
    return new Response("No token", { status: 404 });
  }
  const res = await prisma.user.findUnique({
    where: {
      resetToken: token,
    },
  });
  if (!res) {
    return new Response("Bad token", { status: 404 });
  }
  return new Response("good token", { status: 200 });
};
