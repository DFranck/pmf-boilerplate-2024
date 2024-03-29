"use client";

import { verifyNewPasswordSchema, verifyTokenSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
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

const ResetPasswordForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof verifyNewPasswordSchema>>({
    resolver: zodResolver(verifyNewPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  async function onSubmit(value: z.infer<typeof verifyNewPasswordSchema>) {
    const tokenVerif = verifyTokenSchema.safeParse({
      token: searchParams.get("token"),
    });
    if (!tokenVerif.success) {
      toast({
        title: "Error",
        description: "Aucun token disponible",
        variant: "destructive",
      });
      return;
    }
    const token = tokenVerif.data.token;

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...value,
        token,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      toast({
        title: "Error",
        description: data.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: data.message,
        variant: "success",
      });
      router.push("/api/auth/signin");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          const errorMessage = errors.confirmNewPassword?.message;
          if (errorMessage) {
            toast({
              title: "Erreur",
              description: errorMessage,
              variant: "destructive",
            });
          }
        })}
        className="flex flex-col max-w-md space-y-4 justify-center items-center bg-accent text-accent-foreground rounded-lg p-8 "
      >
        <FormField
          name={"newPassword"}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="New Password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name={"confirmNewPassword"}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button>Submit</Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
