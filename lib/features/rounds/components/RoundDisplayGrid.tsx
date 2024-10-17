"use client";

import React from "react";
// import Link from "next/link";
import RoundCard from "./RoundCard";
import { useRounds } from "@/features/rounds/hooks/useRounds";

type Props = {
  query: string;
};

export default function RoundDisplayGrid(props: Props) {
  const {
    data: rounds,
    isPending: isRoundsLoading,
    isError: isRoundError,
  } = useRounds(props.query);

  // const rounds2 = useRounds

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* <div>{JSON.stringify(isRoundsLoading)}</div> */}
      {/* <div>{JSON.stringify(rounds)}</div> */}
      {rounds?.map((object, i) => {
        return (
          // <Link key={i} href={`/round/${object.chainId}/${object.id}`}>
          <RoundCard round={object} />
          // </Link>
        );
      })}
    </div>
  );
}

{
  /* <RoundCard
                            key={i}
                            strategy={object.strategy}
                            id={object.id}
                            name={object.name}
                            description={object.description}
                            eligibility={object.eligibility}
                            chainId={object.chainId}
                            matching={object.matching}
                            roles={object.roles}
                            phases={object.phases}
                            // bannerUrl={object.bannerUrl}
                        />  */
}
