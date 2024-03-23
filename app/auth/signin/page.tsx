import SigninForm from "@/features/auth/SigninForm";
import { auth } from "@/lib/auth";

const Signin = async () => {
  // const session = await getServerSession();
  const session = auth();
  console.log(session);

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
