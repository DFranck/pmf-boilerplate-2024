"use client";

import { verifyNewPasswordSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { verifyTokenSchema } from "../lib/schema";
import { Button } from "./ui/button";
import { Form, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    const tokenParams = verifyTokenSchema.safeParse({
      token: searchParams.get("token"),
    });
    if (!tokenParams.success) {
      return;
    }
    setToken(tokenParams.data.token);
  }, [searchParams]);

  const form = useForm<z.infer<typeof verifyNewPasswordSchema>>({
    resolver: zodResolver(verifyNewPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const onSubmit = async (value: z.infer<typeof verifyNewPasswordSchema>) => {
    const requestBody = {
      ...value,
      token,
    };
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
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
          name={"newPassword"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <Input type="password" {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"confirmNewPassword"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm new password</FormLabel>
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
