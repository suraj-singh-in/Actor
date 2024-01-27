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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import { Label } from "@/components/ui/label";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json5";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

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

  const { fields, append, update, replace } = useFieldArray({
    name: "verses",
    control: form.control,
  });

  // loading state
  const isLoading = form.formState.isSubmitting;

  const errors = form.formState.errors;
  const values = form.getValues().verses;

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

        <Accordion type="multiple" className="w-full">
          {fields.map((field, index) => (
            <AccordionItem value={`item-${index + 1}`}>
              <AccordionTrigger>Verse {index + 1}</AccordionTrigger>
              <AccordionContent key={`verses-container-${index}`}>
                <FormField
                  name={`verses.${index}.name`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verse Name</FormLabel>
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HTTP code</FormLabel>
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Respone Type</FormLabel>
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Response</FormLabel>
                      <FormControl>
                        <AceEditor
                          placeholder="Enter JSON"
                          mode="json"
                          theme="github"
                          name="blah2"
                          onLoad={() => {
                            console.log("this.onLoad");
                          }}
                          onChange={field.onChange}
                          fontSize={16}
                          showPrintMargin={true}
                          showGutter={true}
                          highlightActiveLine={true}
                          setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: false,
                            showLineNumbers: true,
                            tabSize: 2,
                            useWorker: false,
                          }}
                          style={{ width: "100%", height: "200px" }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name={`verses.${index}.isActive`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="my-4">
                      <FormControl>
                        <Label className="flex items-center gap-2 text-xs font-normal">
                          <Switch
                            checked={field.value ? true : false}
                            onCheckedChange={field.onChange}
                            disabled={index ? true : false}
                          />
                          Active
                        </Label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() =>
            append({
              name: "",
              description: "",
              httpCode: 200,
              responseType: "",
              response: "",
              isActive: false,
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
