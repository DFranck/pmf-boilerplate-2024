import SignupForm from "@/features/auth/SignupForm";
import { auth } from "@/lib/auth";
const Signup = async () => {
  const session = await auth();
  console.log(session);

  // if (session) {
  //   return redirect("/");
  // }
  return (
    <>
      <section className="flex min-h-screen flex-col items-center justify-center">
        <SignupForm />
      </section>
    </>
  );
};

export default Signup;
