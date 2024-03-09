import prisma from "@/lib/prisma";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  if (typeof token !== "string") {
    return new Response("Token must be a string", { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      verificationToken: token,
    },
  });
  console.log("count");

  if (!user) {
    return new Response("No user corresponding", { status: 400 });
  }

  const now = new Date();
  if (!user.verificationTokenExpires || user.verificationTokenExpires < now) {
    return new Response("Invalid or expired token", { status: 400 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      verificationToken: "",
      verificationTokenExpires: null,
    },
  });

  return new Response("Account verified", { status: 200 });
};
