import { parsePercent } from './../../utils/index'
import { BigNumber } from '@ethersproject/bignumber'
import { parseEther } from '@ethersproject/units'
import { ethers } from 'ethers'
import { StringMap } from 'types'
import { ZERO_ADDRESS } from 'utils/addresses'
import {
  BackupBasket,
  Basket,
  RevenueSplit,
} from 'components/rtoken-setup/atoms'

export const governanceDefaultValues = {
  defaultGovernance: true,
  unpause: '0',
  votingDelay: '14400', // 2 blocks
  votingPeriod: '21600', // 3 blocks
  proposalThresholdAsMicroPercent: '0.01', // 0.01%
  quorumPercent: '10', // 10%
  minDelay: '72', // 72 hours -> 86400
  guardian: '',
  pauser: '',
  owner: '',
}

export const defaultValues = {
  // token params
  name: '',
  symbol: '',
  manifesto: '',
  ownerAddress: '',
  // backing params
  tradingDelay: '21600',
  auctionLength: '900',
  backingBuffer: '0.01', // 0.01%
  maxTradeSlippage: '0.5', // 0.5%
  issuanceThrottleAmount: '1000000', // Anticipated redemption minimum amount for throttling
  issuanceThrottleRate: '5', // 5% per block
  redemptionThrottleAmount: '1000000',
  redemptionThrottleRate: '2.5',
  // other
  rewardRatio: '0.0000032090147',
  unstakingDelay: '1209600',
  minTrade: '10000',
  maxTrade: '1000000',
  shortFreeze: '259200', // 3days
  longFreeze: '2592000', // 30days
// governance
  ...governanceDefaultValues,
}

export interface RevenueDist {
  rTokenDist: BigNumber
  rsrDist: BigNumber
}

export interface IssuanceThrottle {
  amtRate: BigNumber
  pctRate: BigNumber
}

export interface RTokenConfiguration {
  name: string
  symbol: string
  mandate: string
  params: {
    minTradeVolume: BigNumber
    rTokenMaxTradeVolume: BigNumber
    dist: RevenueDist
    rewardRatio: BigNumber
    unstakingDelay: BigNumber
    tradingDelay: BigNumber
    auctionLength: BigNumber
    backingBuffer: BigNumber
    maxTradeSlippage: BigNumber
    shortFreeze: BigNumber
    longFreeze: BigNumber
    issuanceThrottle: IssuanceThrottle
    redemptionThrottle: IssuanceThrottle
  }
}

export interface BackupBasketConfiguration {
  backupUnit: string
  diversityFactor: BigNumber
  backupCollateral: string[]
}

export interface ExternalDistribution {
  beneficiary: string
  revShare: RevenueDist
}

export interface BasketConfiguration {
  assets: string[]
  primaryBasket: string[]
  weights: BigNumber[]
  backups: BackupBasketConfiguration[]
  beneficiaries: ExternalDistribution[]
}

/**
 * Convert revenue distribution (%) to number of shares
 * The number of shares cannot have decimal numbers
 * To avoid decimals, TOTAL_SHARES = 10000000
 */
export const getSharesFromSplit = (
  split: RevenueSplit
): [RevenueDist, ExternalDistribution[]] => {
  const SHARE_MULTIPLIER = 100 // being 0.1 of 0.1 the min number for share distribution

  return [
    {
      rTokenDist: BigNumber.from(Math.floor(+split.holders * SHARE_MULTIPLIER)),
      rsrDist: BigNumber.from(Math.floor(+split.stakers * SHARE_MULTIPLIER)),
    },
    split.external.map((externalSplit) => {
      const totalShares = +externalSplit.total * SHARE_MULTIPLIER
      const rTokenDist = BigNumber.from(
        Math.floor((totalShares * +externalSplit.holders) / 100)
      )
      const rsrDist = BigNumber.from(
        Math.floor((totalShares * +externalSplit.stakers) / 100)
      )

      return {
        beneficiary: externalSplit.address,
        revShare: {
          rTokenDist,
          rsrDist,
        },
      }
    }),
  ]
}

export const getDeployParameters = (
  tokenConfig: StringMap,
  basket: Basket,
  backup: BackupBasket,
  revenueSplit: RevenueSplit
): [RTokenConfiguration, BasketConfiguration] | null => {
  try {
    const [dist, beneficiaries] = getSharesFromSplit(revenueSplit)

    // RToken configuration parameters
    const config: RTokenConfiguration = {
      name: tokenConfig.name,
      symbol: tokenConfig.ticker,
      mandate: tokenConfig.mandate,
      params: {
        minTradeVolume: parseEther(tokenConfig.minTrade.toString()),
        rTokenMaxTradeVolume: parseEther(tokenConfig.maxTrade.toString()),
        dist,
        rewardRatio: parseEther(tokenConfig.rewardRatio),
        unstakingDelay: BigNumber.from(tokenConfig.unstakingDelay),
        tradingDelay: BigNumber.from(tokenConfig.tradingDelay),
        auctionLength: BigNumber.from(tokenConfig.auctionLength),
        backingBuffer: parsePercent(tokenConfig.backingBuffer),
        maxTradeSlippage: parsePercent(tokenConfig.maxTradeSlippage),
        shortFreeze: BigNumber.from(tokenConfig.shortFreeze),
        longFreeze: BigNumber.from(tokenConfig.longFreeze),
        issuanceThrottle: {
          amtRate: parseEther(tokenConfig.issuanceThrottleAmount),
          pctRate: parsePercent(tokenConfig.issuanceThrottleRate),
        },
        redemptionThrottle: {
          amtRate: parseEther(tokenConfig.redemptionThrottleAmount),
          pctRate: parsePercent(tokenConfig.redemptionThrottleRate),
        },
      },
    }

    // Basket configuration
    const assets: Set<string> = new Set()
    const primaryBasket: string[] = []
    const weights: BigNumber[] = []
    const backups: BackupBasketConfiguration[] = []

    for (const targetUnit of Object.keys(basket)) {
      const { collaterals, distribution, scale } = basket[targetUnit]

      collaterals.forEach((collateral, index) => {
        primaryBasket.push(collateral.address)
        if (collateral.rewardToken && collateral.rewardToken !== ZERO_ADDRESS) {
          assets.add(collateral.rewardToken)
        }

        weights.push(
          parseEther(
            ((Number(distribution[index]) / 100) * Number(scale)).toFixed(18)
          )
        )
      })

      if (backup[targetUnit] && backup[targetUnit].collaterals.length) {
        backups.push({
          backupUnit: ethers.utils.formatBytes32String(
            targetUnit.toUpperCase()
          ),
          diversityFactor: BigNumber.from(
            backup[targetUnit].diversityFactor.toString()
          ),
          backupCollateral: backup[targetUnit].collaterals.map((c) => {
            if (c.rewardToken && c.rewardToken !== ZERO_ADDRESS) {
              assets.add(c.rewardToken)
            }
            return c.address
          }),
        })
      }
    }

    const basketConfig: BasketConfiguration = {
      assets: Array.from(assets),
      primaryBasket,
      weights,
      backups,
      beneficiaries,
    }

    return [config, basketConfig]
  } catch (e) {
    // TODO: Handle error case here
    console.error('Error deploying rToken', e)

    return null
  }
}
