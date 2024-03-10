import transporter from "@/lib/nodemailer";
import prisma from "@/lib/prisma";
import { signupSchema } from "@/lib/schema";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
export const POST = async (req: Request) => {
  const zodVerif = signupSchema.safeParse(await req.json());
  if (!zodVerif.success) {
    return new Response(zodVerif.error.message, { status: 400 });
  }
  const { username, email, password } = zodVerif.data;
  const existingUser = await prisma.user.findUnique({
    where: {
      username,
      email,
    },
  });
  if (existingUser) {
    return new Response("User already exists", { status: 400 });
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
      return console.log(error);
    }
    console.log("Email sent: " + info.response + "to:" + email);
  });
  console.log("newuser", newuser);
  return new Response("User created", { status: 200 });
};
