"use client";

// components
import {
  TheaterInfo,
  TheaterInfoSkeleton,
} from "@/components/page-components/dashboard/TheaterInfo";
import { getAllTheaterByUser } from "@/lib/server-action/theater-action";
import { TypeTheatersListData } from "@/lib/types";

// Libraries
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [theaterDetails, setTheaterDetails] = useState<TypeTheatersListData[]>(
    []
  );

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

      setTheaterDetails(theaters);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getDashboarPageData();
  }, []);

  return (
    <div className="p-10">
      <div className="text-3xl font-bold tracking-tight">Dashboard</div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-4">
        {isLoading &&
          [...new Array(4)].map((_, index) => (
            <TheaterInfoSkeleton key={index} />
          ))}

        {!isLoading &&
          theaterDetails &&
          theaterDetails.length > 0 &&
          theaterDetails.map(
            (theater: TypeTheatersListData, theaterIndex: number) => (
              <TheaterInfo {...theater} key={theaterIndex} />
            )
          )}

        {!isLoading && !theaterDetails && <div>No Theater Available</div>}
      </div>
    </div>
  );
};

export default DashboardPage;
