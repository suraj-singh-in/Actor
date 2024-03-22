"use client";

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

// Libraries
import React, { useEffect, useState } from "react";

const UserPage = () => {
  const [dialogState, setDialogState] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<any>();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // loading state
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [permissions, setPermissions] = useState<any[]>([]);
  const [roleList, setRoleList] = useState<any[]>([]);

  const { toast } = useToast();

  const getPermissions = async (): Promise<void> => {};

  const getRoleList = async (): Promise<void> => {};

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
        <div className="text-3xl font-bold tracking-tight">Users</div>
        <Dialog open={dialogState} onOpenChange={setDialogState}>
          <DialogTrigger asChild>
            <Button variant="default" onClick={() => setDialogState(true)}>
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create/Edit User</DialogTitle>
              <DialogDescription>Enter Role Details,</DialogDescription>
            </DialogHeader>
            Create User Form
          </DialogContent>
        </Dialog>
      </div>
      <div className="mx-auto py-10">
        {/* <DataTable
          columns={generateColumns({ handleViewDetailsClick })}
          data={roleList}
        /> */}
      </div>
    </div>
  );
};

export default UserPage;
