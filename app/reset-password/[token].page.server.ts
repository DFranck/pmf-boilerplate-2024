import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function loader({ params }: { params: { token: string } }) {
  const token = params.token as string;

  const user = await prisma.user.findUnique({
    where: { resetToken: token },
  });

  if (!user || !user.resetTokenExpires || new Date() > user.resetTokenExpires) {
    return redirect("/error-page");
  }

  return { props: { token } };
}
