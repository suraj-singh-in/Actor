"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";

import { SubmitHandler, useForm } from "react-hook-form";
import { createTheaterScheam } from "@/lib/formValidationConstants";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import Loader from "@/components/Loader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createTheater } from "@/lib/server-action/theater-action";
import { useToast } from "@/components/ui/use-toast";

const CreateTheaterForm = ({ onSuccess }: any) => {
  const [submitError, setSubmitError] = useState("");
  const { toast } = useToast();

  // Form Details
  const form = useForm<z.infer<typeof createTheaterScheam>>({
    mode: "onChange",
    resolver: zodResolver(createTheaterScheam),
    defaultValues: {},
  });

  // loading state
  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<z.infer<typeof createTheaterScheam>> = async (
    formData
  ) => {
    const headers = {
      Authorization: localStorage.getItem("ACTOR_TOKEN"),
    };

    // submit error submit
    const values: any = { ...formData };

    values["isAdminTheater"] = true;

    const { result, error } = await createTheater({ payload: values, headers });

    if (result) {
      const { data } = result;
      onSuccess();
    }

    if (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
      >
        <FormField
          disabled={isLoading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Theater Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Logo Url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {submitError && <FormMessage>{submitError}</FormMessage>}
        <Button
          type="submit"
          className="w-full p-6"
          size="lg"
          disabled={isLoading}
        >
          {!isLoading ? "Create" : <Loader />}
        </Button>
      </form>
    </Form>
  );
};

export default CreateTheaterForm;
