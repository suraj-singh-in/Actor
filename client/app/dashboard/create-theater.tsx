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
import { MultiSelect } from "@/components/MultiSelect";

const CreateTheaterForm = () => {
  const [submitError, setSubmitError] = useState("");

  // Form Details
  const form = useForm<z.infer<typeof createTheaterScheam>>({
    mode: "onChange",
    resolver: zodResolver(createTheaterScheam),
    defaultValues: { viewerList: [], editorList: [] },
  });

  // loading state
  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<z.infer<typeof createTheaterScheam>> = async (
    formData
  ) => {
    // submit error submit
    console.log("🚀 ~ CreateTheaterForm ~ formData:", formData);
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
        <FormField
          disabled={isLoading}
          control={form.control}
          name="viewerList"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MultiSelect
                  selected={field.value}
                  options={[]}
                  placeholder="Viewers"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isLoading}
          control={form.control}
          name="editorList"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MultiSelect
                  selected={field.value}
                  options={[]}
                  placeholder="Editors"
                  {...field}
                />
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
