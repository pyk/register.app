import { FacadeInterface } from 'abis'
import { Facade, FacadeAct } from 'abis/types'
import { formatUnits } from 'ethers/lib/utils'
import { atom } from 'jotai'
import { atomWithReset, loadable } from 'jotai/utils'
import {
  getValidWeb3Atom,
  rTokenAssetERC20MapAtom,
  rTokenAssetsAtom,
  rTokenAtom,
  rTokenContractsAtom,
} from 'state/atoms'
import { promiseMulticall } from 'state/web3/lib/multicall'
import { Token } from 'types'
import { getContract } from 'utils'
import {
  FACADE_ACT_ADDRESS,
  FACADE_ADDRESS,
  RSR_ADDRESS,
} from 'utils/addresses'
import { simplifyLoadable } from 'utils/atoms/utils'

export interface Auction {
  sell: Token
  buy: Token
  amount: string
  minAmount: string
  trader: string
  canStart: boolean
  output: number // estimated token output
}

export interface AuctionToSettle {
  type: 'Revenue' | 'Backing'
  trader: string
  sell: Token
  buy: Token | null
}

export interface Trade {
  id: string
  amount: number
  auctionId: number
  buying: string
  buyingTokenSymbol: string
  sellingTokenSymbol: string
  endAt: number
  selling: string
  startedAt: number
  worstCasePrice: number
}
export const AUCTION_TYPES = {
  REVENUE: 'Revenue',
  BACKING: 'Recollaterization',
}

export const tradesAtom = atom<{ current: Trade[]; ended: Trade[] }>({
  current: [],
  ended: [],
})
export const currentTradesAtom = atom((get) => get(tradesAtom).current)
export const endedTradesAtom = atom((get) => get(tradesAtom).ended)

export const selectedAuctionsAtom = atomWithReset<number[]>([])
export const auctionSessionAtom = atom(0)

export const auctionSidebarAtom = atom<boolean>(false)

const accumulatedRevenue = loadable(
  atom(async (get) => {
    const { provider, chainId } = get(getValidWeb3Atom)
    const rToken = get(rTokenAtom)
    const assetMap = get(rTokenAssetERC20MapAtom)
    const assets = get(rTokenAssetsAtom)
    const session = get(auctionSessionAtom)

    if (!provider || !rToken || !Object.keys(assets).length || !session) {
      return 0
    }

    const contract = getContract(
      FACADE_ADDRESS[chainId],
      FacadeInterface,
      provider
    ) as Facade

    const { balances, balancesNeededByBackingManager, erc20s } =
      await contract.callStatic.balancesAcrossAllTraders(rToken.address)

    return erc20s.reduce((revenue, erc20, index) => {
      const priceUsd = assets[assetMap[erc20]]?.priceUsd || 0
      const decimals = assets[assetMap[erc20]]?.token.decimals || 18

      return (
        revenue +
        Number(
          formatUnits(
            balances[index].sub(balancesNeededByBackingManager[index]),
            decimals
          )
        ) *
          priceUsd
      )
    }, 0)
  })
)

const settleableAuctions = loadable(
  atom(async (get): Promise<AuctionToSettle[] | null> => {
    const { provider, chainId } = get(getValidWeb3Atom)
    const rToken = get(rTokenAtom)
    const assetMap = get(rTokenAssetERC20MapAtom)
    const assets = get(rTokenAssetsAtom)
    const { rsrTrader, rTokenTrader, backingManager } = get(rTokenContractsAtom)
    const session = get(auctionSessionAtom)

    if (
      !provider ||
      !rToken ||
      !Object.keys(assets).length ||
      !rsrTrader ||
      !session
    ) {
      return null
    }

    const traders = [
      {
        address: rsrTrader,
        buy: assets[assetMap[RSR_ADDRESS[chainId]]].token,
        type: AUCTION_TYPES.REVENUE,
      },
      {
        address: rTokenTrader,
        buy: {
          symbol: rToken.symbol,
          address: rToken.address,
          name: rToken.name,
          decimals: rToken.decimals,
        },
        type: AUCTION_TYPES.REVENUE,
      },
      { address: backingManager, buy: null, type: AUCTION_TYPES.BACKING }, // TODO: What to show here?
    ]

    const result = await promiseMulticall(
      traders.map(({ address }) => ({
        abi: FacadeInterface,
        address: FACADE_ADDRESS[chainId],
        method: 'auctionsSettleable',
        args: [address],
      })),
      provider
    )

    return result.reduce((auctionsToSettle, current, index) => {
      auctionsToSettle.push(
        ...current.map((erc20: string) => ({
          type: traders[index].type,
          trader: traders[index].address,
          sell: assets[assetMap[erc20]].token,
          buy: traders[index].buy,
        }))
      )

      return auctionsToSettle
    }, [] as AuctionToSettle[])
  })
)

// TODO: This can be executed from the global context to display the number of auctions available
const auctionsOverview = loadable(
  atom(
    async (
      get
    ): Promise<{
      revenue: Auction[]
      recollaterization: Auction | null
    } | null> => {
      const { provider, chainId } = get(getValidWeb3Atom)
      const { rsrTrader, rTokenTrader, backingManager } =
        get(rTokenContractsAtom)
      const assetMap = get(rTokenAssetERC20MapAtom)
      const assets = get(rTokenAssetsAtom)
      const rToken = get(rTokenAtom)
      const session = get(auctionSessionAtom)

      if (
        !provider ||
        !rsrTrader ||
        !rTokenTrader ||
        !backingManager ||
        !rToken ||
        !Object.keys(assets).length ||
        !session
      ) {
        return null
      }

      const contract = getContract(
        FACADE_ACT_ADDRESS[chainId],
        FacadeInterface,
        provider
      ) as FacadeAct

      const [rsrRevenueOverview, rTokenRevenueOverview, recoAuction] =
        await Promise.all([
          contract.callStatic.revenueOverview(rsrTrader),
          contract.callStatic.revenueOverview(rTokenTrader),
          contract.callStatic.nextRecollateralizationAuction(backingManager),
        ])

      const auctions = rsrRevenueOverview.erc20s.reduce((acc, erc20, index) => {
        const asset = assets[assetMap[erc20]]
        const rsrTradeAmount = formatUnits(
          rsrRevenueOverview.surpluses[index],
          asset.token.decimals
        )
        const rTokenTradeAmount = formatUnits(
          rTokenRevenueOverview.surpluses[index],
          asset.token.decimals
        )

        if (asset.token.address !== RSR_ADDRESS[chainId]) {
          acc[rsrRevenueOverview.canStart[index] ? 'unshift' : 'push']({
            sell: asset.token,
            buy: assets[assetMap[RSR_ADDRESS[chainId]]].token,
            amount: rsrTradeAmount,
            minAmount: formatUnits(
              rsrRevenueOverview.minTradeAmounts[index],
              asset.token.decimals
            ),
            trader: rsrTrader,
            canStart: rsrRevenueOverview.canStart[index],
            output:
              +rsrTradeAmount /
              (assets[assetMap[RSR_ADDRESS[chainId]]].priceUsd /
                asset.priceUsd),
          })
        }

        if (asset.token.address !== rToken.address) {
          acc[rTokenRevenueOverview.canStart[index] ? 'unshift' : 'push']({
            sell: asset.token,
            buy: assets[assetMap[rToken.address]].token,
            amount: rTokenTradeAmount,
            minAmount: formatUnits(
              rTokenRevenueOverview.minTradeAmounts[index],
              asset.token.decimals
            ),
            trader: rTokenTrader,
            canStart: rTokenRevenueOverview.canStart[index],
            output:
              +rTokenTradeAmount /
              (assets[assetMap[rToken.address]].priceUsd / asset.priceUsd),
          })
        }

        return acc
      }, [] as Auction[])

      let recollaterizationAuction = null

      if (recoAuction.canStart) {
        const sell = assets[assetMap[recoAuction.sell]]
        const buy = assets[assetMap[recoAuction.buy]]
        const amount = formatUnits(recoAuction.sellAmount, sell.token.decimals)

        recollaterizationAuction = {
          sell: sell.token,
          buy: buy.token,
          amount,
          minAmount: '0',
          trader: backingManager,
          canStart: true,
          output: +amount / (buy.priceUsd / sell.priceUsd),
        }
      }

      return { revenue: auctions, recollaterization: recollaterizationAuction }
    }
  )
)

export const auctionsToSettleAtom = simplifyLoadable(settleableAuctions)
export const accumulatedRevenueAtom = simplifyLoadable(accumulatedRevenue)
export const auctionsOverviewAtom = simplifyLoadable(auctionsOverview)
