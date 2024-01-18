// static
import { Drama } from "lucide-react";

// UI Component
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// types
import { TypeTheatersListData } from "@/lib/types";

const TheaterInfo = (props: TypeTheatersListData) => {
  const { name, numberOfActs } = props;
  return (
    <Card className="cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        <Drama />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{numberOfActs} Acts</div>
        <p className="text-xs text-muted-foreground">Created: </p>
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
