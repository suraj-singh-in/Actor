"use client";

import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import {DashboardLayout} from "@/components/layout";
import {Toaster} from "@/components/ui/toaster";

interface IRootLayout {
    children: React.ReactNode;
}

export default function RootLayout({children}: IRootLayout) {
    const router = useRouter();

    // check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem("ACTOR_TOKEN");

        // If token is not present then logout the user
        if (!token && router) {
            router.replace("/login");
        }
    }, [router]);

    return (
        <>
            <DashboardLayout>
                {children}
            </DashboardLayout>
            <Toaster/>
        </>
    );
}
