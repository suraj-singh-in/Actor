"use client";
// importing libraries
import React, { useState } from "react";

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

const PermissionPage = () => {
  const [dialogState, setDialogState] = useState<boolean>(false);

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <div className="text-3xl font-bold tracking-tight">Permission</div>
        <Dialog open={dialogState} onOpenChange={setDialogState}>
          <DialogTrigger asChild>
            <Button variant="default" onClick={() => setDialogState(true)}>
              Add Permission
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Permission</DialogTitle>
              <DialogDescription>Enter Permission Details,</DialogDescription>
            </DialogHeader>
            ADD PERMISSION FORM
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PermissionPage;
