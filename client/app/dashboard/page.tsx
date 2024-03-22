"use client";

// ui components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// page components
import {
  TheaterInfo,
  TheaterInfoSkeleton,
} from "@/components/page-components/dashboard/TheaterInfo";
import CreateTheaterForm from "@/components/page-components/dashboard/create-theater";

// server actions
import { getAllTheaterByUser } from "@/lib/server-action/theater-action";
import { getUserList } from "@/lib/server-action/user-actions";

// types
import { TypeTheatersListData } from "@/lib/types";

// Libraries
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [viewTheaterList, setViewtheaterList] = useState<
    TypeTheatersListData[]
  >([]);
  const [editTheaterList, setEditTheaterList] = useState<
    TypeTheatersListData[]
  >([]);
  const [dialogState, setDialogState] = useState(false);
  const { toast } = useToast();

  // loading state
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDashboarPageData = async () => {
    setIsLoading(true);

    const headers = {
      Authorization: localStorage.getItem("ACTOR_TOKEN"),
    };

    // server side calls to backend to get current user theater
    const { result, error } = await getAllTheaterByUser({ headers });

    if (result) {
      const { data } = result;

      const viewTheaters: TypeTheatersListData[] = data.theaters.viewTheaters;
      const editTheaters: TypeTheatersListData[] = data.theaters.editTheaters;

      setViewtheaterList(viewTheaters);
      setEditTheaterList(editTheaters);
    }

    if (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }

    setIsLoading(false);
  };

  const onTheaterCreateSuccess = () => {
    setDialogState(false);
    getDashboarPageData();
  };

  useEffect(() => {
    getDashboarPageData();
  }, []);

  return (
    <div className="p-10" suppressHydrationWarning>
      <div className="flex justify-between">
        <div className="text-3xl font-bold tracking-tight">Dashboard</div>
        <Dialog open={dialogState} onOpenChange={setDialogState}>
          <DialogTrigger asChild>
            <Button variant="default" onClick={() => setDialogState(true)}>
              Create Theater
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Theater</DialogTitle>
              <DialogDescription>
                Enter theater details, and let the play start.
              </DialogDescription>
            </DialogHeader>
            <CreateTheaterForm onSuccess={onTheaterCreateSuccess} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="text-xl font-bold tracking-tight py-2 pt-4">
        Your Theaters
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        {isLoading &&
          [...new Array(12)].map((_, index) => (
            <TheaterInfoSkeleton key={`TheaterInfoSkeleton-${index}`} />
          ))}

        {!isLoading &&
          editTheaterList &&
          editTheaterList.length > 0 &&
          editTheaterList.map(
            (theater: TypeTheatersListData, index: number) => (
              <React.Fragment key={`${theater.theaterId}-${index}`}>
                <TheaterInfo
                  {...theater}
                  key={`${theater.theaterId}-${index}`}
                  onCloneSuccess={getDashboarPageData}
                />
              </React.Fragment>
            )
          )}

        {!isLoading &&
          viewTheaterList &&
          viewTheaterList.length > 0 &&
          viewTheaterList.map(
            (theater: TypeTheatersListData, index: number) => (
              <React.Fragment key={`${theater.theaterId}-${index}`}>
                <TheaterInfo
                  {...theater}
                  key={`${theater.theaterId}-${index}`}
                  onCloneSuccess={getDashboarPageData}
                  isViewOnly
                />
              </React.Fragment>
            )
          )}
      </div>
      {!isLoading && editTheaterList.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>You Don't have permission to edit any theater</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs">Why don't you create one? ☝️</p>
          </CardContent>
        </Card>
      )}
      {!isLoading && viewTheaterList.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No Theater to view</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs">Why don't you create one? ☝️</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardPage;
