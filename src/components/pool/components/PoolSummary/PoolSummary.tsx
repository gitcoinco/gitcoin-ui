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

  return (
    <div className="inline-flex h-60 w-[1440px] items-end justify-between bg-[#f6f6f6] px-20 pb-6 pt-[88px]">
      <div>
        <PoolBadge badge={pool.strategy} type="poolType" />
        <div className="text-4xl leading-10">{pool.name}</div>
        <IconLabel
          endDate={pool.registerStartDate}
          startDate={pool.registerEndDate}
          type="period"
        />
      </div>
      <div className="inline-flex h-32 flex-col items-end justify-between">
        <PoolBadge badge={poolStatus} type="poolStatus" />
        <div className="inline-flex items-start justify-start gap-6">
          <Button
            icon={<Icon type={IconType.LINK} />}
            variant="outlined-secondary"
            value="Round application"
            ref={`https://builder.gitcoin.co/#/chains/${pool.chainId}/round/${pool.poolId}/apply`}
          />
          <Button
            icon-={<Icon type={IconType.EXPLORER} />}
            variant="outlined-secondary"
            value="View round"
            ref={`https://explorer.gitcoin.co/#/round/${pool.chainId}/${pool.poolId}`}
          />
        </div>
      </div>
    </div>
  );
};
