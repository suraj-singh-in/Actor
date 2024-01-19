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

// page components
import {
  TheaterInfo,
  TheaterInfoSkeleton,
} from "@/components/page-components/dashboard/TheaterInfo";
import CreateTheaterForm from "./create-theater";

// server actions
import { getAllTheaterByUser } from "@/lib/server-action/theater-action";
import { getUserList } from "@/lib/server-action/user-actions";

// types
import { TypeTheatersListData } from "@/lib/types";

// Libraries
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [theaterList, settheaterList] = useState<TypeTheatersListData[]>([]);
  const [userList, setUserList] = useState([]);
  const [dialogState, setDialogState] = useState(false);

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

      const theaters: TypeTheatersListData[] = data.theaters;

      settheaterList(theaters);
    }

    setIsLoading(false);
  };

  const getUserListData = async () => {
    const headers = {
      Authorization: localStorage.getItem("ACTOR_TOKEN"),
    };

    // server side calls to backend to get current user theater
    const { result, error } = await getUserList({ headers });

    if (result) {
      const { data } = result;

      const userList = data.users;

      setUserList(userList);
    }
  };

  const onTheaterCreateSuccess = () => {
    setDialogState(false);
    getDashboarPageData();
  };

  useEffect(() => {
    getDashboarPageData();
    getUserListData();
  }, []);

  return (
    <div className="p-10" suppressHydrationWarning>
      <div className="flex justify-between">
        <div className="text-3xl font-bold tracking-tight">Dashboard</div>
        <Dialog open={dialogState}>
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
            <CreateTheaterForm
              userList={userList}
              onSuccess={onTheaterCreateSuccess}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="text-xl font-bold tracking-tight py-2 pt-4">
        Original Theater
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        {isLoading &&
          [...new Array(12)].map((_, index) => (
            <TheaterInfoSkeleton key={`TheaterInfoSkeleton-${index}`} />
          ))}

        {!isLoading &&
          theaterList &&
          theaterList.length > 0 &&
          theaterList.map((theater: TypeTheatersListData, index: number) =>
            theater.isAdminTheater ? (
              <React.Fragment key={`${theater.theaterId}-${index}`}>
                <TheaterInfo
                  {...theater}
                  key={`${theater.theaterId}-${index}`}
                  onCloneSuccess={getDashboarPageData}
                />
              </React.Fragment>
            ) : (
              <React.Fragment
                key={`${theater.theaterId}-${index}`}
              ></React.Fragment>
            )
          )}
      </div>
      <div className="text-xl font-bold tracking-tight py-2 pt-4">
        Cloned Theater
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        {isLoading &&
          [...new Array(12)].map((_, index) => (
            <TheaterInfoSkeleton key={`TheaterInfoSkeleton-cloned-${index}`} />
          ))}

        {!isLoading &&
          theaterList &&
          theaterList.length > 0 &&
          theaterList.map((theater: TypeTheatersListData, index: number) =>
            !theater.isAdminTheater ? (
              <TheaterInfo
                {...theater}
                key={`${theater.theaterId}-${index}-cloned`}
              />
            ) : (
              <React.Fragment
                key={`${theater.theaterId}-${index}-cloned`}
              ></React.Fragment>
            )
          )}
      </div>
      {!isLoading && theaterList.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No Theater Available</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs ">Why don't you create one?</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardPage;
