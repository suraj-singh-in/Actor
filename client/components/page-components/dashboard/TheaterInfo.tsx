// static
import { Drama } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TheaterInfoProps = {
  projectName: string;
  numberOfActs: string;
};

const TheaterInfo = (props: TheaterInfoProps) => {
  const { projectName, numberOfActs } = props;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{projectName}</CardTitle>
        <Drama />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{numberOfActs} Acts</div>
        <p className="text-xs text-muted-foreground">Created: </p>
      </CardContent>
    </Card>
  );
};

export default TheaterInfo;
