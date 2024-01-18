"use client";

// components
import TheaterInfo from "@/components/page-components/dashboard/TheaterInfo";
import { getAllTheaterByUser } from "@/lib/server-action/theater-action";

// Libraries
import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [theaterDetails, setTheaterDetails] = useState<any>([]);

  const getDashboarPageData = async () => {
    const headers = {
      Authorization: localStorage.getItem("ACTOR_TOKEN"),
    };

    // server side calls to backend to get current user theater
    const { result, error } = await getAllTheaterByUser({ headers });

    if (result) {
      const {
        data: { theaters },
      } = result;

      setTheaterDetails(theaters);
    }
  };

  useEffect(() => {
    getDashboarPageData();
  }, []);

  return (
    <div className="p-10">
      <div className="text-3xl font-bold tracking-tight">Dashboard</div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-4">
        {theaterDetails &&
          theaterDetails.length &&
          theaterDetails.map((theater: any, theaterIndex: number) => {
            return (
              <TheaterInfo
                projectName={theater.name}
                numberOfActs={theater.numberOfActs}
                key={theaterIndex}
              />
            );
          })}
      </div>
    </div>
  );
};

export default DashboardPage;
