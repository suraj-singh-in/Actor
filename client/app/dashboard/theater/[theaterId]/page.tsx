"use client";

// componets
import Loader from "@/components/Loader";
import CreateActForm from "@/components/page-components/dashboard/create-act";

// actions
import { getTheaterDetails } from "@/lib/server-action/theater-action";

// types
import { TypeAct, TypeTheater, TypeTheaterDetails } from "@/lib/types";

// Libraries
import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

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

const TheaterDetailsPage = ({ params }: { params: { theaterId: string } }) => {
  const { toast } = useToast();

  // getting theaterID
  const theaterId = params.theaterId;

  // theater details state
  const [theaterDetails, setTheaterDetails] = useState<TypeTheater>();
  const [actList, setActList] = useState<TypeAct[]>([]);

  // loading state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dialogState, setDialogState] = useState<boolean>(false);

  const getTheaterPageData = async () => {
    setIsLoading(true);

    const headers = {
      Authorization: localStorage.getItem("ACTOR_TOKEN"),
    };

    // server side calls to backend to get current user theater
    const { result, error } = await getTheaterDetails({ headers, theaterId });

    if (result) {
      const { data } = result;
      let { theaterDetails, actDetails } = data;

      actDetails = actDetails.map((act: TypeAct) => {
        return { ...act, theaterName: theaterDetails.name };
      });

      setTheaterDetails(theaterDetails);
      setActList(actDetails);
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
    getTheaterPageData();
  }, []);

  // show all the acts

  return (
    <div className="p-10">
      {!isLoading ? (
        <>
          <div className="flex justify-between">
            <div className="text-3xl font-bold tracking-tight">
              {theaterDetails?.name || "Theater Details"}
            </div>
            <Dialog open={dialogState} onOpenChange={setDialogState}>
              <DialogTrigger asChild>
                <Button variant="default" onClick={() => setDialogState(true)}>
                  Create Act
                </Button>
              </DialogTrigger>
              <DialogContent
                className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
              >
                <DialogHeader>
                  <DialogTitle>
                    Create New Act in {theaterDetails?.name}
                  </DialogTitle>
                  <DialogDescription>Enter API Details here.</DialogDescription>
                </DialogHeader>
                <CreateActForm
                  theaterDetails={theaterDetails}
                  onSuccess={() => {
                    setDialogState(false);
                    getTheaterPageData();
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
          <div>{theaterDetails?.description}</div>
          <div className="mx-auto py-10">
            <DataTable columns={columns} data={actList} />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default TheaterDetailsPage;
