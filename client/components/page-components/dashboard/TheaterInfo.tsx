// static
import { Drama, MoreHorizontal } from "lucide-react";

// UI Component
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// types
import { TypeTheatersListData } from "@/lib/types";

// libs
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getTheaterBaseUrl } from "@/lib/utils";
import { cloneTheater } from "@/lib/server-action/theater-action";
import { useToast } from "@/components/ui/use-toast";

const TheaterInfo = (props: TypeTheatersListData) => {
  const { name, numberOfActs, createdAt, theaterId, isAdminTheater } = props;
  const router = useRouter();
  const { toast } = useToast();

  const handleCloneTheaterClick = async () => {
    // get headers
    const headers = {
      Authorization: localStorage.getItem("ACTOR_TOKEN"),
    };

    const { result, error } = await cloneTheater({
      headers,
      payload: { theaterId },
    });

    if (result) {
      const { data } = result;
      props.onCloneSuccess();
    }

    if (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
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
                navigator.clipboard.writeText(getTheaterBaseUrl(name))
              }
            >
              Copy base URL
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                router.push(`/dashboard/theater/${theaterId}`);
              }}
            >
              View Details
            </DropdownMenuItem>
            {isAdminTheater ? (
              <DropdownMenuItem onClick={handleCloneTheaterClick}>
                Clone Theater
              </DropdownMenuItem>
            ) : (
              <></>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{numberOfActs} Acts</div>
        {createdAt ? (
          <p className="text-xs text-muted-foreground">
            created on: {new Date(createdAt).toLocaleString()}
          </p>
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
};

const TheaterInfoSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-12 w-12 rounded-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4" />
        <Skeleton className="h-2 mt-2" />
      </CardContent>
    </Card>
  );
};

export { TheaterInfo, TheaterInfoSkeleton };
