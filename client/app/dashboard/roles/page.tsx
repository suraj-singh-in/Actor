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

// components
import CreateRoleForm from "@/components/page-components/dashboard/create-role";

// types
import { TypePermissionOption, TypeRole } from "@/lib/types";

// actions
import { getAllPermissions } from "@/lib/server-action/permission-actions";
import { getAllRoles } from "@/lib/server-action/role-actions";
import { DataTable } from "@/components/data-table";
import { generateColumns } from "./columns";

const RolePage = () => {
  const [dialogState, setDialogState] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<TypeRole>();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // loading state
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [permissions, setPermissions] = useState<TypePermissionOption[]>([]);
  const [roleList, setRoleList] = useState<TypeRole[]>([]);

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

      const formattedPermission = data.map((item: any) => {
        return { label: item.name, id: item._id };
      });

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

  const getRoleList = async (): Promise<void> => {
    setIsLoading(true);

    const headers = {
      Authorization: localStorage.getItem("ACTOR_TOKEN"),
    };

    // server side calls to backend to get current user theater
    const { result, error } = await getAllRoles({ headers });

    if (result) {
      const { data } = result;

      setRoleList(data);
    }

    if (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }

    setIsLoading(false);
  };

  const handleViewDetailsClick = (row: any): void => {
    setSelectedRole(row);
    setIsEditMode(true);
    setDialogState(true);
  };

  useEffect(() => {
    getPermissions();
    getRoleList();
  }, []);

  useEffect(() => {
    if (!dialogState) {
      setIsEditMode(false);
      setSelectedRole(undefined);
    }
  }, [dialogState]);

  const onRoleCreateSuccess = () => {
    getRoleList();
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
              isEdit={isEditMode}
              selectedRole={selectedRole}
              onSuccessEdit={() => {
                setDialogState(false);
                getRoleList();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="mx-auto py-10">
        <DataTable
          columns={generateColumns({ handleViewDetailsClick })}
          data={roleList}
        />
      </div>
    </div>
  );
};

export default RolePage;
