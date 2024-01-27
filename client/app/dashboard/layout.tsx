"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("ACTOR_TOKEN");

    // If token is not present then logut the user
    if (!token) {
      router.replace("/login");
    }
  }, []);

  return (
    <>
      <DashboardLayout children={children} />
      <Toaster />
    </>
  );
}
