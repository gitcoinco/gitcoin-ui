import { UseQueryResult } from "@tanstack/react-query";
import { match, P } from "ts-pattern";

import { Skeleton } from "@/ui-shadcn/skeleton";

import { onClickProps, PoolData } from "../../types";
import { PoolDataCard } from "./PoolDataCard";

export interface PoolCardQueryProps extends onClickProps {
  queryResult: UseQueryResult<PoolData, Error>;
}

export interface PoolCardProps extends PoolData, onClickProps {}

export function PoolCard(props: PoolCardProps | PoolCardQueryProps) {
  return match(props)
    .with({ queryResult: P.not(P.nullish) }, ({ queryResult }) =>
      match(queryResult)
        .with({ status: "error", error: P.select() }, (error) => <PoolErrorCard error={error} />)
        .with({ status: "pending" }, () => <LoadingCard />)
        .with({ status: "success", data: P.select() }, (data) => (
          <PoolDataCard data={data} redirectProps={props} />
        ))
        .otherwise(() => <PoolErrorCard />),
    )
    .otherwise(() => <PoolDataCard data={props as PoolData} redirectProps={props} />);
}

function LoadingCard() {
  return (
    <div className="grid w-full grid-cols-2 items-center rounded-lg border p-3 max-[450px]:grid-cols-1">
      <div className="flex flex-col items-start gap-4 max-[450px]:items-center">
        <Skeleton className="h-5 w-1/2 rounded-md" />
        <Skeleton className="h-5 w-1/2 rounded-md" />
        <Skeleton className="h-5 w-1/2 rounded-md" />
        <Skeleton className="h-5 w-1/2 rounded-md" />
      </div>
      <div className="flex w-full flex-col items-end max-[450px]:items-center max-[450px]:pt-4">
        <Skeleton className="h-5 w-2/4 rounded-md" />
      </div>
    </div>
  );
}

export function PoolErrorCard({ error }: { error?: Error | null }) {
  return <>{error ? <div>Error: {error.message}</div> : <div>Unknown Error</div>}</>;
}
