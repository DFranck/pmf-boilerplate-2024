"use client";

import { signupSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
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
const SignupForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof signupSchema>) {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    console.log(res);
    const data = await res.json();

    if (!res.ok) {
      console.log(data.message);
      toast({
        description: data.message,
        title: "Error",
        variant: "destructive",
      });
    } else {
      toast({
        description: data.message,
        title: "Success",
        variant: "success",
      });
      router.push("/auth/signin");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col max-w-md space-y-4 justify-center items-center bg-accent text-accent-foreground rounded-lg p-8 "
      >
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pseudo</FormLabel>
              <FormControl>
                <Input placeholder="Entrer votre pseudo" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Entrer votre Email"
                  {...field}
                />
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
                  placeholder="Entrer votre Password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Link
          className="text-gray-500 w-full text-sm text-right"
          href="/api/auth/signin"
        >
          Already have an account? <b>Sign in</b>
        </Link>
        <Button type="submit">SignUp</Button>
      </form>
    </Form>
  );
};

export default SignupForm;
