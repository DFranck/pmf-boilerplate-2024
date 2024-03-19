"use client";

import { signinSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useToast } from "../../components/ui/use-toast";
const SigninForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof signinSchema>) {
    const res = await signIn("credentials", {
      ...values,
      redirect: false,
    });
    if (res?.error) {
      toast({
        title: "Error",
        description: "User not found",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Sign in successfully",
        variant: "success",
      });
      router.push("/");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col max-w-md space-y-4 justify-center items-center bg-gray-100 rounded-lg p-8 "
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your Email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your Password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Link
          className="text-blue-500 w-full text-sm text-right"
          href="/auth/forgot-password"
        >
          Password oublié?
        </Link>
        <Button type="submit">Submit</Button>
        <Link
          className="text-gray-500 w-full text-sm text-right"
          href="/auth/signup"
        >
          Create an account <b className="text-blue-500">Signup now</b>
        </Link>
      </form>
    </Form>
  );
};

export default SigninForm;
