import ResetPasswordForm from "@/components/ResetPasswordForm";

const ResetPasswordPage = ({ token }: { token: string }) => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <ResetPasswordForm token={token} />
    </section>
  );
};

export default ResetPasswordPage;
