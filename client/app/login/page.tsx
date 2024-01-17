"use client";
// Libraries
import React, { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { loginFormSchema } from "@/lib/formValidationConstants";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// UI Components
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import Loader from "@/components/Loader";
import { LOGIN_PAGE_CONFIG } from "@/lib/constant";
import { LoginAction } from "@/lib/server-action/auth-actions";
import { useRouter } from "next/navigation";

function LoginPage() {
  const router = useRouter();

  const [submitError, setSubmitError] = useState("");
  const { title, description, formFieldConfigs, submitButtonText } =
    LOGIN_PAGE_CONFIG;

  // Form Details
  const form = useForm<z.infer<typeof loginFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
    defaultValues: { userName: "", password: "" },
  });

  // loading state
  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<z.infer<typeof loginFormSchema>> = async (
    formData
  ) => {
    const { error, result } = await LoginAction(formData);
    if (error) {
      setSubmitError(error);
    }

    if (result) {
      const { data } = result;
      localStorage.setItem("ACTOR_TOKEN", data.token);
      router.replace("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onChange={() => {
                if (submitError) setSubmitError("");
              }}
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
            >
              {formFieldConfigs.map((fieldConfig, fieldConfigIndex) => {
                const { name, type, placeholder } = fieldConfig;
                return (
                  <FormField
                    key={fieldConfigIndex}
                    disabled={isLoading}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type={type}
                            placeholder={placeholder}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}

              {submitError && <FormMessage>{submitError}</FormMessage>}
              <Button
                type="submit"
                className="w-full p-6"
                size="lg"
                disabled={isLoading}
              >
                {!isLoading ? submitButtonText : <Loader />}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
