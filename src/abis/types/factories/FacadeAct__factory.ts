/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { FacadeAct, FacadeActInterface } from "../FacadeAct";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IRToken",
        name: "rToken",
        type: "address",
      },
    ],
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "data",
        type: "bytes[]",
      },
    ],
    name: "multicall",
    outputs: [
      {
        internalType: "bytes[]",
        name: "results",
        type: "bytes[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IRevenueTrader",
        name: "revenueTrader",
        type: "address",
      },
      {
        internalType: "contract IERC20[]",
        name: "toSettle",
        type: "address[]",
      },
      {
        internalType: "contract IERC20[]",
        name: "toStart",
        type: "address[]",
      },
      {
        internalType: "enum TradeKind",
        name: "kind",
        type: "uint8",
      },
    ],
    name: "runRevenueAuctions",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class FacadeAct__factory {
  static readonly abi = _abi;
  static createInterface(): FacadeActInterface {
    return new utils.Interface(_abi) as FacadeActInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FacadeAct {
    return new Contract(address, _abi, signerOrProvider) as FacadeAct;
  }
}
