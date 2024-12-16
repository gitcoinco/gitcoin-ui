import { UseQueryResult } from "@tanstack/react-query";
import { match, P } from "ts-pattern";

import { Badge, Skeleton } from "@/primitives";
import { PoolData } from "@/types";

import { PoolDataCard } from "./PoolDataCard";

export interface PoolCardQueryProps {
  queryResult: UseQueryResult<PoolData, Error>;
}

export type PoolCardProps = PoolData;

export function PoolCard(props: PoolCardProps | PoolCardQueryProps) {
  return match(props)
    .with({ queryResult: P.not(P.nullish) }, ({ queryResult }) =>
      match(queryResult)
        .with({ status: "error", error: P.select() }, (error) => <PoolErrorCard error={error} />)
        .with({ status: "pending" }, () => <LoadingCard />)
        .with({ status: "success", data: P.select() }, (data) => <PoolDataCard data={data} />)
        .otherwise(() => <PoolErrorCard />),
    )
    .otherwise(() => <PoolDataCard data={props as PoolData} />);
}

function LoadingCard() {
  return (
    <div className="inline-flex h-60 w-full items-center justify-between rounded-2xl border border-grey-100 p-6">
      <div className="flex items-center justify-start gap-6">
        <Skeleton className="relative size-48 rounded-2xl" />
        <div className="inline-flex flex-col items-start justify-start gap-3">
          <Skeleton className="h-8 w-72 rounded-md" />
          <Skeleton className="h-6 w-36 rounded-md" />
          <Skeleton className="h-6 w-72 rounded-md" />
          <Skeleton className="h-6 w-64 rounded-md" />
          <Skeleton className="h-6 w-28 rounded-md" />
        </div>
      </div>
      <Badge skeleton size="md" />
    </div>
  );
}

export function PoolErrorCard({ error }: { error?: Error | null }) {
  return <>{error ? <div>Error: {error.message}</div> : <div>Unknown Error</div>}</>;
}
