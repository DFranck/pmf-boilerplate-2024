import dynamic from "next/dynamic";
import { Suspense } from "react";

const ResetPasswordForm = dynamic(
  () => import("@/features/auth/ResetPasswordForm"),
  { suspense: true }
);
const ResetPassword = async () => {
  return (
    <Suspense fallback={null}>
      <section className="flex min-h-screen flex-col items-center justify-center">
        <ResetPasswordForm />
      </section>
    </Suspense>
  );
};

export default ResetPassword;
