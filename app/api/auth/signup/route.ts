import transporter from "@/lib/nodemailer";
import prisma from "@/lib/prisma";
import { signupSchema } from "@/lib/schema";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
export const POST = async (req: Request) => {
  const zodVerif = signupSchema.safeParse(await req.json());
  if (!zodVerif.success) {
    console.log("Error: ", zodVerif.error);
    return new Response(zodVerif.error.message, { status: 400 });
  }
  const { username, email, password } = zodVerif.data;
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });
  if (existingUser) {
    console.log("User already exists");
    return new Response(JSON.stringify({ message: "User already exists" }), {
      status: 409,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const generateVerificationToken = () => {
    return randomBytes(32).toString("hex");
  };
  const verificationToken = generateVerificationToken();
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 1);

  const newuser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpires: expiryDate,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Verify your email",
    text: `Please click on the following link to verify your email: ${process.env.HOST_URL}/api/verify?token=${verificationToken}`,
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.log(error);
    }
    console.log("Email sent: " + info.response + " to:" + email);
  });
  console.log("newuser", newuser);
  return new Response(JSON.stringify({ message: `User ${username} created` }), {
    status: 200,
  });
};
