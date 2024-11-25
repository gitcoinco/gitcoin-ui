import { PoolBadge, PoolStatus, PoolType } from "@/components/Badges";
import { IconLabel } from "@/components/IconLabel";
import { Button } from "@/primitives/Button";
import { Icon, IconType } from "@/primitives/Icon";

export interface PoolSummaryProps {
  chainId: number;
  poolId: string;
  strategy: PoolType;
  name: string;
  registerStartDate: Date;
  registerEndDate: Date;
  allocationStartDate: Date;
  allocationEndDate: Date;
}

export const PoolSummary = (pool: PoolSummaryProps) => {
  let poolStatus: PoolStatus;
  const now = new Date();

  if (now >= pool.registerStartDate && now <= pool.registerEndDate) {
    poolStatus = PoolStatus.ApplicationsInProgress;
  } else if (now > pool.registerEndDate && now <= pool.allocationStartDate) {
    poolStatus = PoolStatus.FundingPending;
  } else if (now > pool.allocationStartDate && now <= pool.allocationEndDate) {
    poolStatus = PoolStatus.RoundInProgress;
  } else {
    poolStatus = PoolStatus.PreRound;
  }

  const applyLink = `https://builder.gitcoin.co/#/chains/${pool.chainId}/round/${pool.poolId}/apply`;
  const explorerLink = `https://explorer.gitcoin.co/#/round/${pool.chainId}/${pool.poolId}`;

  return (
    <div className="inline-flex h-48 w-full items-end justify-between bg-grey-50 px-12 pb-6">
      <div className="flex flex-col gap-2">
        <div>
          <PoolBadge badge={pool.strategy} type="poolType" />
        </div>
        <div className="text-4xl leading-10">{pool.name}</div>
        <div className="flex gap-2 text-grey-900">
          Registration Period
          <IconLabel
            endDate={pool.registerStartDate}
            startDate={pool.registerEndDate}
            type="period"
          />
        </div>
      </div>
      <div className="inline-flex h-24 flex-col items-end justify-between">
        <PoolBadge badge={poolStatus} type="poolStatus" />
        <div className="inline-flex items-start justify-start gap-6">
          <Button
            icon={<Icon type={IconType.LINK} />}
            variant="outlined-secondary"
            value="Round application"
            onClick={() => window.open(applyLink, "_blank")}
          />
          <Button
            icon={<Icon type={IconType.EXPLORER} />}
            variant="outlined-secondary"
            value="View round"
            onClick={() => window.open(explorerLink, "_blank")}
          />
        </div>
      </div>
    </div>
  );
};
