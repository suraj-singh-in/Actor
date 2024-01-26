"use client";

import { TypeAct } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { getActUrl } from "@/lib/utils";
import Link from "next/link";

export const generateColumns = ({
  handleChangeActiveClick,
}: any): ColumnDef<TypeAct>[] => {
  const columns: ColumnDef<TypeAct>[] = [
    {
      accessorKey: "name",
      header: "API Name",
    },
    {
      accessorKey: "method",
      header: "Method",
    },
    {
      accessorKey: "endPoint",
      header: "End Point",
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const actDetails = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(
                    getActUrl(actDetails.theaterName || "", actDetails.endPoint)
                  )
                }
              >
                Copy Endpoint
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href={`/dashboard/theater/${actDetails.theaterId}/act/${actDetails._id}`}
                >
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleChangeActiveClick(row)}>
                Change Active
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};
