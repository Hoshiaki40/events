"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { login } from "@/src/server-actions/auth/login.action";
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
  LoginInput,
  loginSchema,
} from "@/src/presentation/schemas/auth.schema";

import { FormError } from "../form-error-message";

export function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();
  const { executeAsync, isPending, result, execute, hasSucceeded } =
    useAction(login);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginInput) => {
    const result = await executeAsync(data);

    if (result?.data?.success) {
      router.push(DEFAULT_LOGIN_REDIRECT);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-500 to-purple-600">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Se connecter</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Email ou nom d'utilisateur"
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
                            type={isVisible ? "text" : "password"}
                            placeholder="Mot de passe"
                            className="rounded-xl py-6 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={toggleVisibility}
                          >
                            {isVisible ? (
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
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <Label htmlFor="rememberMe" className="text-sm">
                          Se souvenir de moi
                        </Label>
                      </FormItem>
                    )}
                  />
                  <Link
                    href="#"
                    className="text-sm text-primary hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <Button
                  className="w-full rounded-xl py-6"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? "Chargement..." : "Se connecter"}
                </Button>
                <FormError message={result.serverError} />
                <Separator className="my-4" />
                <Button
                  className="w-full rounded-xl py-6"
                  variant="outline"
                  onClick={() =>
                    signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT })
                  }
                >
                  <FcGoogle className="mr-2 h-5 w-5" />
                  Continuer avec Google
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Besoin de créer un compte ?{" "}
                  <Link
                    href="/register"
                    className="text-primary hover:underline"
                  >
                    S&apos;inscrire
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
