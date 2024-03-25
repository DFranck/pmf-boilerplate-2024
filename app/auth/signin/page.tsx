import SigninForm from "@/features/auth/SigninForm";
import { auth } from "@/lib/auth";

const Signin = async () => {
  // const session = await getServerSession();
  const session = await auth();
  if (!session) {
    console.log("SESSION NO EXISTE", session);
  } else {
    console.log("SESSION EXISTE", session);
  }

  // if (session) {
  //   redirect("/");
  // }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <SigninForm />
    </section>
  );
};

export default Signin;
