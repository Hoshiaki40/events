"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/src/presentation/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/presentation/components/ui/form";
import { Input } from "@/src/presentation/components/ui/input";
import { Textarea } from "@/src/presentation/components/ui/textarea";
import { Project } from "@/src/domain/jee/project";

import { useCurrentSession } from "../../hooks/use-current-session";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface NewProjectFormProps {
  onSuccess: () => void;
}

export function ProjectForm({ onSuccess }: NewProjectFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useCurrentSession();

  const createProjectMutation = useMutation<Project, Error, FormValues>({
    mutationFn: async (values: FormValues) => {
      const response = await fetch("http://localhost:8080/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        credentials: "include",
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      return (await response.json()) as Project;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: FormValues) {
    const result = await createProjectMutation.mutateAsync(values);
    router.push(`/project/${result.id}`);
    onSuccess();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter project title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter project description (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={createProjectMutation.isPending}>
          {createProjectMutation ? "Creating..." : "Create Project"}
        </Button>
      </form>
    </Form>
  );
}
