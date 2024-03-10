"use client";

import { resetPasswordSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";

const ResetPasswordForm = ({ token }: { token: string }) => {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (value: z.infer<typeof resetPasswordSchema>) => {
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...value, token }),
    });
    if (!res.ok) {
      return Response.json({ error: "Response POST is not ok" });
    } else {
      return Response.json({ success: "Response POST is ok" });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col max-w-md space-y-4 justify-center items-center bg-gray-100 rounded-lg p-8 "
      >
        <FormField
          control={form.control}
          name={"password"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <Input type="password" {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"confirmPassword"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <Input type="password" {...field} />
            </FormItem>
          )}
        />
        <Button>Submit</Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
