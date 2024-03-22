"use client";

// ui component
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Libraries
import React, { useState } from "react";

const ActDetailsPage = ({
  params,
}: {
  params: { theaterId: string; actId: string };
}) => {
  const { toast } = useToast();

  // getting theaterID
  const theaterId = params.theaterId;
  const actId = params.actId;

  return <div className="p-10">ActDetailsPage</div>;
};

export default ActDetailsPage;
