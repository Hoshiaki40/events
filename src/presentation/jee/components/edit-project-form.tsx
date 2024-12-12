"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/presentation/components/ui/form";
import { Project } from "@/src/domain/jee/project";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useCurrentSession } from "../../hooks/use-current-session";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EditProjectFormProps {
  project: Project;
  onSuccess: () => void;
}

export function EditProjectForm({ project, onSuccess }: EditProjectFormProps) {
  const queryClient = useQueryClient();
  const user = useCurrentSession();

  const updateProjectMutation = useMutation<Project, Error, FormValues>({
    mutationFn: async (values: FormValues) => {
      const response = await fetch(
        `http://localhost:8080/api/projects/${project.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            ...project,
            ...values,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
      onSuccess();
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: project.title,
      description: project.description || "",
    },
  });

  async function onSubmit(values: FormValues) {
    await updateProjectMutation.mutateAsync(values);
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
        <Button type="submit" disabled={updateProjectMutation.isPending}>
          {updateProjectMutation.isPending ? "Updating..." : "Update Project"}
        </Button>
      </form>
    </Form>
  );
}
