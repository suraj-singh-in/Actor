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

  // theater details state
  // const [theaterDetails, setTheaterDetails] = useState<TypeTheater>();
  // const [actList, setActList] = useState<TypeAct[]>([]);

  // // loading state
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [dialogState, setDialogState] = useState<boolean>(false);

  // const getTheaterPageData = async () => {
  //   setIsLoading(true);

  //   const headers = {
  //     Authorization: localStorage.getItem("ACTOR_TOKEN"),
  //   };

  //   // server side calls to backend to get current user theater
  //   const { result, error } = await getTheaterDetails({ headers, theaterId });

  //   if (result) {
  //     const { data } = result;
  //     let { theaterDetails, actDetails } = data;

  //     actDetails = actDetails.map((act: TypeAct) => {
  //       return { ...act, theaterName: theaterDetails.name };
  //     });

  //     setTheaterDetails(theaterDetails);
  //     setActList(actDetails);
  //   }

  //   if (error) {
  //     toast({
  //       title: "Uh oh! Something went wrong.",
  //       description: error,
  //     });
  //   }

  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   getTheaterPageData();
  // }, []);

  return <div className="p-10">ActDetailsPage</div>;
};

export default ActDetailsPage;
