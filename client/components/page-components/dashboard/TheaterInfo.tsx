// static
import { Drama } from "lucide-react";

// UI Component
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// types
import { TypeTheatersListData } from "@/lib/types";

// libs
import { useRouter } from "next/navigation";

const TheaterInfo = (props: TypeTheatersListData) => {
  const { name, numberOfActs, createdAt, theaterId } = props;
  const router = useRouter();

  return (
    <Card
      className="cursor-pointer"
      onClick={() => {
        router.replace(`/dashboard/theater/${theaterId}`);
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        <Drama />
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
