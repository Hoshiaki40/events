// src/presentation/hooks/useAuth.ts
import { useRouter } from "next/router";
import { useState } from "react";
import { User } from "../../domain/entities/user";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    // Implement login logic using server action
  };

  const register = async (userData: Omit<User, "id">) => {
    // Implement register logic using server action
  };

  const logout = () => {
    setUser(null);
    router.push("/login");
  };

  return { user, login, register, logout };
};
