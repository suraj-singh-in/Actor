"use client";

// Libraries
import React, { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { createRoleFormSchema } from "@/lib/formValidationConstants";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// UI Component
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import { TypePermissionOption, TypeRole } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { useToast } from "@/components/ui/use-toast";

// actions
import { createRole, editRole } from "@/lib/server-action/role-actions";

interface ICreateRoleForm {
  permissionsList: TypePermissionOption[];
  onSuccess: any;
  onSuccessEdit: any;
  isEdit: boolean;
  selectedRole?: TypeRole;
}

const CreateRoleForm = ({
  permissionsList,
  onSuccess,
  isEdit,
  selectedRole,
}: ICreateRoleForm) => {
  const [submitError, setSubmitError] = useState("");
  const { toast } = useToast();

  const permissionList = selectedRole?.permissions.map(
    (permission) => permission._id
  );
  const selectedRoleFormaated = {
    ...selectedRole,
    permissions: permissionList,
  };

  // Form Details
  const form = useForm<z.infer<typeof createRoleFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(createRoleFormSchema),
    defaultValues: isEdit
      ? selectedRoleFormaated
      : { name: "", permissions: [] },
  });

  // loading state
  const isLoading = form.formState.isSubmitting;

  const handleCreate = async (formData: any): Promise<void> => {
    const headers = {
      Authorization: localStorage.getItem("ACTOR_TOKEN"),
    };

    const payload = {
      ...formData,
      key: formData.name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
    };

    const { result, error } = await createRole({ payload, headers });

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

  const handleEdit = async (formData: any): Promise<void> => {
    const headers = {
      Authorization: localStorage.getItem("ACTOR_TOKEN"),
    };

    const payload = {
      ...formData,
      roleId: selectedRole && selectedRole._id,
      key: formData.name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
    };

    const { result, error } = await editRole({ payload, headers });

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

  const onSubmit: SubmitHandler<z.infer<typeof createRoleFormSchema>> = async (
    formData
  ) => {
    if (isEdit) {
      await handleEdit(formData);
    } else {
      await handleCreate(formData);
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
              <FormLabel>Role Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter Role Name" {...field} />
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
              <FormLabel>Role Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="permissions"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Permission List</FormLabel>
                <FormDescription>Select the permissions.</FormDescription>
              </div>
              {permissionsList.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="permissions"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
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

export default CreateRoleForm;
