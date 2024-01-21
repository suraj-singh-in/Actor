"use client";

// components
import Loader from "@/components/Loader";

// ui components
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

// libs
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useEffect, useState } from "react";

// constants
import { createActSchema } from "@/lib/formValidationConstants";

// actions
import { createTheater } from "@/lib/server-action/theater-action";
import { Button } from "@/components/ui/button";
import { createAct } from "@/lib/server-action/act-actions";
import { TypeTheater } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Divide, SeparatorHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const CreateActForm = ({
  theaterDetails,
  onSuccess,
}: {
  theaterDetails: TypeTheater | undefined;
  onSuccess: any;
}) => {
  const [submitError, setSubmitError] = useState("");
  const { toast } = useToast();

  // Form Details
  const form = useForm<z.infer<typeof createActSchema>>({
    mode: "onChange",
    resolver: zodResolver(createActSchema),
    defaultValues: {
      name: "",
      description: "",
      endPoint: "",
      method: "",
      verses: [
        {
          name: "",
          description: "",
          httpCode: 200,
          responseType: "",
          response: "",
          isActive: true,
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    name: "verses",
    control: form.control,
  });

  // loading state
  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<z.infer<typeof createActSchema>> = async (
    formData
  ) => {
    const headers = {
      Authorization: localStorage.getItem("ACTOR_TOKEN"),
    };

    const values: any = { ...formData };
    values["theaterId"] = theaterDetails?._id;

    const { result, error } = await createAct({ payload: values, headers });

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
        className="space-y-6 flex flex-col"
      >
        <FormField
          name="name"
          disabled={isLoading}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Act Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="endPoint"
          disabled={isLoading}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Endpoint</FormLabel>
              <FormControl>
                <Input type="text" placeholder="API Endpoint" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="method"
          disabled={isLoading}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Method</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="API Method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          disabled={isLoading}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <div className="text-sm text-muted-foreground">
          Initial Active Verse Details
        </div>
        <Separator />

        {fields.map((field, index) => (
          <React.Fragment key={`verses-container-${index}`}>
            <FormField
              name={`verses.${index}.name`}
              control={form.control}
              key={field.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Verse Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`verses.${index}.httpCode`}
              control={form.control}
              key={field.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    HTTP code
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`verses.${index}.responseType`}
              control={form.control}
              key={field.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Respone Type
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="API Method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="JSON">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`verses.${index}.description`}
              control={form.control}
              key={field.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`verses.${index}.response`}
              control={form.control}
              key={field.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Response
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Please insert stringify JSON, support for JSON field is on way"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`verses.${index}.isActive`}
              control={form.control}
              key={field.id}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active</FormLabel>
                    <FormDescription>
                      This is default, hence this is active by default.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={true} aria-readonly />
                  </FormControl>
                </FormItem>
              )}
            />
          </React.Fragment>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={fields.length ? true : false}
          className="mt-2"
          onClick={() =>
            append({
              name: "",
              description: "",
              httpCode: 200,
              responseType: "",
              response: "",
              isActive: true,
            })
          }
        >
          Add Verse
        </Button>
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

export default CreateActForm;
