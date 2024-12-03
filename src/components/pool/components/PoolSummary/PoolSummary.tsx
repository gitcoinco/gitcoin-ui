import { tv } from "tailwind-variants";

import { IconLabel, PoolBadge } from "@/components";
import { getChainInfo } from "@/lib";
import { cn } from "@/lib/utils";
import { Breadcrumb, Button, Icon, IconType } from "@/primitives";
import { PoolStatus, PoolType } from "@/types";

const variants = tv({
  variants: {
    default: "bg-grey-50 px-20 py-3",
  },
});

export interface PoolSummaryProps {
  chainId: number;
  poolId: string;
  programId: string;
  name?: string;
  strategyName?: string;
  applicationsStartTime?: string;
  applicationsEndTime?: string;
  donationsStartTime?: string;
  donationsEndTime?: string;
}

export const PoolSummary = (pool: PoolSummaryProps) => {
  const chainInfo = getChainInfo(pool.chainId);
  let poolStatus: PoolStatus;
  const poolType = pool.strategyName as PoolType;

  const now = new Date();

  const registerStartDate = pool.applicationsStartTime
    ? new Date(pool.applicationsStartTime)
    : new Date();
  const registerEndDate = pool.applicationsEndTime
    ? new Date(pool.applicationsEndTime)
    : new Date();
  const allocationStartDate = pool.donationsStartTime
    ? new Date(pool.donationsStartTime)
    : new Date();
  const allocationEndDate = pool.donationsEndTime ? new Date(pool.donationsEndTime) : new Date();

  if (now >= registerStartDate && now <= registerEndDate) {
    poolStatus = PoolStatus.ApplicationsInProgress;
  } else if (now > registerEndDate && now <= allocationStartDate) {
    poolStatus = PoolStatus.FundingPending;
  } else if (now > allocationStartDate && now <= allocationEndDate) {
    poolStatus = PoolStatus.RoundInProgress;
  } else {
    poolStatus = PoolStatus.PreRound;
  }
  const applyLink = `https://builder.gitcoin.co/#/chains/${pool.chainId}/round/${pool.poolId}/apply`;
  const explorerLink = `https://explorer.gitcoin.co/#/round/${pool.chainId}/${pool.poolId}`;

  const breadcrumbItems = [
    { label: "My Programs", href: "https://manager.gitcoin.co/#/" },
    {
      label: "Program Details",
      href: `https://manager.gitcoin.co/#/chain/${pool.chainId}/program/${pool.programId}`,
    },
    {
      label: "Round Details",
      href: `https://explorer.gitcoin.co/#/round/${pool.chainId}/${pool.poolId}`,
    },
  ];
  return (
    <div className={cn(variants.variants.default, "grid grid-cols-2")}>
      <div className="flex flex-col items-start justify-start gap-4">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col gap-2">
          <div>
            <PoolBadge type="poolType" badge={poolType} />
          </div>
          <IconLabel
            textVariant="text-[36px]/[39px]"
            iconVariant="size-6"
            iconType={chainInfo.icon}
            type="default"
            label={pool.name ?? `Round ${pool.poolId}`}
          />
          <IconLabel
            type="roundPeriod"
            startDate={allocationStartDate}
            endDate={allocationEndDate}
          />
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <div className="flex items-end">
          <PoolBadge type="poolStatus" badge={poolStatus} />
        </div>
        <div className="flex items-end gap-6">
          <Button
            icon={<Icon type={IconType.LINK} />}
            className="border-gray-100 bg-white text-black shadow-sm"
            value="Round application"
            onClick={() => window.open(applyLink, "_blank")}
          />
          <Button
            icon={<Icon type={IconType.EXPLORER} />}
            className="border-gray-100 bg-white text-black shadow-sm"
            value="View round"
            onClick={() => window.open(explorerLink, "_blank")}
          />
        </div>
      </div>
    </div>
  );
};
