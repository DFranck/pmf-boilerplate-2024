import ResetPasswordForm from "@/features/auth/ResetPasswordForm";
const ResetPassword = async () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <ResetPasswordForm />
    </section>
  );
};

export default ResetPassword;
