import SignupForm from "@/components/SignupForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
const Signup = async () => {
  const session = await getServerSession();
  if (session) {
    return redirect("/");
  }
  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <SignupForm />
    </section>
  );
};

export default Signup;
