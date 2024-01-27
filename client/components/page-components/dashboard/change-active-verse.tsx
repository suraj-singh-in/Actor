import { TypeAct } from "@/lib/types";
import React, { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";

import { changeActiveVerseSchema } from "@/lib/formValidationConstants";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { changeActiveVerse } from "@/lib/server-action/verse-action";

const ChangeActiveVerseForm = ({
  act,
  onSuccess,
}: {
  act: TypeAct | undefined | null;
  onSuccess: any;
}) => {
  const [submitError, setSubmitError] = useState("");
  const { toast } = useToast();

  // taking out current active id
  const currentActiveVerseId =
    act && act.verses && act.verses.length
      ? act.verses.find((verse) => verse.isActive)?._id
      : "";

  // Form Details
  const form = useForm<z.infer<typeof changeActiveVerseSchema>>({
    mode: "onChange",
    resolver: zodResolver(changeActiveVerseSchema),
    defaultValues: { verseId: currentActiveVerseId },
  });

  // loading state
  const isLoading = form.formState.isSubmitting;

  // on submit
  const onSubmit: SubmitHandler<
    z.infer<typeof changeActiveVerseSchema>
  > = async (formData) => {
    const headers = {
      Authorization: localStorage.getItem("ACTOR_TOKEN"),
    };

    // create payload
    const payload = {
      ...formData,
      actId: act?._id,
    };

    const { result, error } = await changeActiveVerse({ payload, headers });

    if (result) {
      const { data } = result;
      toast({
        title: "SUCCESS",
        description: result.message,
      });
      onSuccess();
    }

    // submit error submit
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
          control={form.control}
          name="verseId"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Select Active Verse</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {act && act.verses && act.verses.length ? (
                    act.verses.map((verse, verseIndex) => {
                      return (
                        <FormItem
                          className="flex items-center space-x-3 space-y-0"
                          key={`form-item-${verseIndex}`}
                        >
                          <FormControl>
                            <RadioGroupItem value={verse._id} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {verse.name}
                          </FormLabel>
                        </FormItem>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </RadioGroup>
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
          {!isLoading ? "Change Active Verse" : <Loader />}
        </Button>
      </form>
    </Form>
  );
};

export default ChangeActiveVerseForm;
