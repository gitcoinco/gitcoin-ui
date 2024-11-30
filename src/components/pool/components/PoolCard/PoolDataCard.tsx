import { IconLabel, PoolBadge } from "@/components";
import { getChainInfo } from "@/lib";
import { modularRedirect } from "@/lib/utils";
import { PoolData } from "@/types";
import { OnClickProps } from "@/types";

export interface PoolDataCardProps {
  data: PoolData;
  redirectProps?: OnClickProps;
}

export function PoolDataCard({ data, redirectProps }: PoolDataCardProps) {
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
        <PoolBadge badge={data.poolType} type="poolType" />
        <IconLabel type="period" startDate={data.startDate} endDate={data.endDate} />
        <IconLabel type="default" label={name} iconType={icon} />
      </div>
      <div className="flex w-full flex-col items-end max-[450px]:items-center max-[450px]:pt-4">
        <PoolBadge badge={data.poolStatus} type="poolStatus" />
      </div>
    </div>
  );
}
