import { match } from "ts-pattern";

import { Button } from "@/primitives";

import { RetrofundingIcon, VoteIcon } from "./icons";

export interface VoteLandingProps {
  type: "vote";
  roundName: string;
  roundDescription: string;
  handleConnect?: () => void;
}

export interface AdminLandingProps {
  type: "admin";
  handleConnect?: () => void;
}

export type LandingProps = VoteLandingProps | AdminLandingProps;

export const LandingPage = (props: LandingProps) => {
  return match(props.type)
    .with("vote", () => <VoteLanding props={props as VoteLandingProps} />)
    .with("admin", () => <AdminLanding props={props as AdminLandingProps} />)
    .exhaustive();
};

const VoteLanding = ({ props }: { props: VoteLandingProps }) => {
  return (
    <div className="background-grid-purple flex flex-col items-center justify-center">
      <div className="flex max-w-[564px] flex-col items-center gap-8 ">
        <VoteIcon />
        <div className="flex flex-col gap-4 text-center">
          <div className="text-2xl font-medium">{props.roundName}</div>
          <div className="text-[16px]/[28px]">{props.roundDescription}</div>
        </div>
        <ConnectWallet handleConnect={props.handleConnect} type="vote" />
      </div>
    </div>
  );
};

const AdminLanding = ({ props }: { props: AdminLandingProps }) => {
  return (
    <div className="background-grid-green flex flex-col justify-center">
      <div className="flex flex-col items-center gap-10">
        <RetrofundingIcon />
        <ConnectWallet handleConnect={props.handleConnect} type="admin" />
      </div>
    </div>
  );
};

const ConnectWallet = ({
  type,
  handleConnect,
}: {
  type: "vote" | "admin";
  handleConnect?: () => void;
}) => {
  const className = match(type)
    .with("vote", () => "bg-purple-900 text-[14px]/[24px]")
    .with("admin", () => "bg-moss-700 text-[14px]/[24px]")
    .exhaustive();
  return <Button value="Connect wallet" onClick={handleConnect} className={className} />;
};
