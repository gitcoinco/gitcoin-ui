import { StatCard, StatCardProps } from "@/primitives/StatCard";

export type StatCardGroupProps = {
  stats: StatCardProps[];
};

export const StatCardGroup = ({ stats }: StatCardGroupProps) => {
  return (
    <div className="flex flex-wrap justify-normal gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};
