"use client";
// importing libraries
import React, { useEffect, useState } from "react";

// importing UI components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { getAllPermissions } from "@/lib/server-action/permission-actions";

import CreateRoleForm from "@/components/page-components/dashboard/create-role";

import { TypePermissionOption } from "@/lib/types";

const RolePage = () => {
  const [dialogState, setDialogState] = useState<boolean>(false);

  // loading state
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [permissions, setPermissions] = useState<TypePermissionOption[]>([]);

  const { toast } = useToast();

  const getPermissions = async (): Promise<void> => {
    setIsLoading(true);

    const headers = {
      Authorization: localStorage.getItem("ACTOR_TOKEN"),
    };

    // server side calls to backend to get current user theater
    const { result, error } = await getAllPermissions({ headers });

    if (result) {
      const { data } = result;
      console.log("🚀 ~ getPermissions ~ data:", data);

      const formattedPermission = data.map((item: any) => {
        return { label: item.name, id: item._id };
      });
      console.log(
        "🚀 ~ formattedPermission ~ formattedPermission:",
        formattedPermission
      );

      setPermissions(formattedPermission);
    }

    if (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const onRoleCreateSuccess = () => {
    setDialogState(false);
  };

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <div className="text-3xl font-bold tracking-tight">Roles</div>
        <Dialog open={dialogState} onOpenChange={setDialogState}>
          <DialogTrigger asChild>
            <Button variant="default" onClick={() => setDialogState(true)}>
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>Enter Role Details,</DialogDescription>
            </DialogHeader>
            <CreateRoleForm
              permissionsList={permissions}
              onSuccess={onRoleCreateSuccess}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RolePage;
