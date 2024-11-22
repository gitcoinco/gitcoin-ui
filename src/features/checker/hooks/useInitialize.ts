import { useEffect } from "react";

import { Hex } from "viem";

import { setInitialStateAction, useCheckerDispatchContext } from "../store";
import { usePoolData } from "./usePoolData";

interface Props {
  address: Hex;
  poolId: string;
  chainId: number;
}

export const useInitialize = ({ address, poolId, chainId }: Props) => {
  const dispatch = useCheckerDispatchContext();

  useEffect(() => {
    dispatch(setInitialStateAction({ address, poolId, chainId }));
  }, [address, poolId, chainId]);

  usePoolData();
};
