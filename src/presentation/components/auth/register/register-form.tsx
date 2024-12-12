"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register } from "@/src/server-actions/auth/register.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/src/presentation/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/presentation/components/ui/card";
import { Checkbox } from "@/src/presentation/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/src/presentation/components/ui/form";
import { Input } from "@/src/presentation/components/ui/input";
import { Label } from "@/src/presentation/components/ui/label";
import { Separator } from "@/src/presentation/components/ui/separator";
import {
  RegisterInput,
  registerSchema,
} from "@/src/presentation/schemas/auth.schema";

import { FormError } from "../form-error-message";

export function RegisterForm() {
  const { executeAsync, result, isPending } = useAction(register);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const router = useRouter();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      termOfCondition: true,
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    const result = await executeAsync(data);
    if (result?.data?.success) router.push("/login");
  };

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-500 to-purple-600">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">S'inscrire</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Adresse e-mail"
                          type="email"
                          className="rounded-xl py-6"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="Mot de passe"
                            className="rounded-xl py-6 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={togglePasswordVisibility}
                          >
                            {isPasswordVisible ? (
                              <Eye className="h-6 w-6" />
                            ) : (
                              <EyeOff className="h-6 w-6" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={
                              isConfirmPasswordVisible ? "text" : "password"
                            }
                            placeholder="Confirmer le mot de passe"
                            className="rounded-xl py-6 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={toggleConfirmPasswordVisibility}
                          >
                            {isConfirmPasswordVisible ? (
                              <Eye className="h-6 w-6" />
                            ) : (
                              <EyeOff className="h-6 w-6" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="termOfCondition"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <Label htmlFor="termOfCondition" className="text-sm">
                        Je suis d'accord avec les{" "}
                        <Link href="#" className="text-primary hover:underline">
                          Conditions générales
                        </Link>
                      </Label>
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full rounded-xl py-6"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? "Chargement..." : "S'inscrire"}
                </Button>
                <FormError message={result.serverError} />
                <Separator className="my-4" />
                <Button
                  className="w-full rounded-xl py-6"
                  variant="outline"
                  onClick={() =>
                    signIn("google", { callbackUrl: "/dashboard" })
                  }
                >
                  <FcGoogle className="mr-2 h-5 w-5" />
                  Continuer avec Google
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Vous avez déjà un compte ?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Se connecter
                  </Link>
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
