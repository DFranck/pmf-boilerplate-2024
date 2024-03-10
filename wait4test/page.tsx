import ResetPasswordForm from "@/components/ResetPasswordForm";
import prisma from "@/lib/prisma";
import { GetServerSidePropsContext } from "next";
const ResetPassword = async ({ token }: { token: string }) => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <ResetPasswordForm token={token} />
    </section>
  );
};

export default ResetPassword;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.params?.token;
  if (Array.isArray(token)) {
    return {
      redirect: {
        destination: "/error-page",
      },
    };
  }
  // Logique pour vérifier le token...
  const user = await prisma.user.findUnique({
    where: { resetToken: token },
  });

  if (!user || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
    return {
      redirect: {
        destination: "/error-page",
        permanent: false,
      },
    };
  }

  return {
    props: { token },
  };
}
