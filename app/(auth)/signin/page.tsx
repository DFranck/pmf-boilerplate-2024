import SigninForm from "@/components/SigninForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Signin = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <SigninForm />
    </section>
  );
};

export default Signin;
