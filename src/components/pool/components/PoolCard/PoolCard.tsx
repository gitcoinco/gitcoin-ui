import { match, P } from "ts-pattern";

import { PoolBadge } from "@/components/Badges";
import { IconLabel } from "@/components/IconLabel";
import { PoolCardDataProps, PoolCardProps, onClickProps } from "@/components/pool/types/types";
import { getChainInfo } from "@/lib/icons/chains";
import { modularRedirect } from "@/lib/utils";
import { Skeleton } from "@/ui-shadcn/skeleton";

export function PoolCard(props: PoolCardProps) {
  return match(props)
    .with({ queryResult: P.not(P.nullish) }, ({ queryResult }) =>
      match(queryResult)
        .with({ status: "error", error: P.select() }, (error) => <ErrorCard error={error} />)
        .with({ status: "pending" }, () => <LoadingCard />)
        .with({ status: "success", data: P.select() }, (data) => (
          <DataCard data={data} redirectProps={props} />
        ))
        .otherwise(() => <ErrorCard />),
    )
    .otherwise(() => <DataCard data={props as PoolCardDataProps} redirectProps={props} />);
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

export function DataCard({
  data,
  redirectProps,
}: {
  data: PoolCardDataProps;
  redirectProps?: onClickProps;
}) {
  const { name, icon } = getChainInfo(data.chainId);
  return (
    <div
      className="grid w-full cursor-pointer grid-cols-2 items-center rounded-lg border p-3 max-[450px]:grid-cols-1"
      onClick={() =>
        modularRedirect(
          redirectProps?.redirectLink,
          redirectProps?.redirect,
          data.chainId.toString(),
          data.roundId,
        )
      }
    >
      <div className="flex flex-col items-start gap-4 max-[450px]:items-center">
        <span>{data.roundName}</span>
        <PoolBadge badge={data.roundType} type="roundType" />
        <IconLabel type="period" startDate={data.startDate} endDate={data.endDate} />
        <IconLabel type="default" label={name} iconType={icon} />
      </div>
      <div className="flex w-full flex-col items-end max-[450px]:items-center max-[450px]:pt-4">
        <PoolBadge badge={data.roundStatus} type="roundStatus" />
      </div>
    </div>
  );
}

export function ErrorCard({ error }: { error?: Error | null }) {
  return <>{error ? <div>Error: {error.message}</div> : <div>Unknown Error</div>}</>;
}
