import { ChainId, CHAIN_ID } from 'utils/chains'
import {
  COMPOUND_ADDRESS,
  STAKE_AAVE_ADDRESS,
  ZERO_ADDRESS,
} from 'utils/addresses'

export interface CollateralPlugin {
  symbol: string // collateral symbol
  address: string // collateral plugin address
  decimals: number // 6-18
  targetUnit: string // USD / EUR / etc
  referenceUnit: string // Underlay ERC20 (USDC)
  collateralToken: string // Wrapper token (usually yield token)
  collateralAddress: string
  description: string // Small description
  rewardToken: string // yield token aave / compound wrapped Asset
  custom?: boolean
}

export const TARGET_UNITS = {
  USD: 'USD',
  EUR: 'EUR',
  ETH: 'ETH',
  BTC: 'BTC',
}

const collateralPlugins: { [chainId: number]: CollateralPlugin[] } = {
  [ChainId.Mainnet]: [
    // FIAT COLLATERAL
    {
      symbol: 'DAI',
      address: '0xe5E6bBE251c22C9E100a3A10e88C5Abdfd24f6d8',
      decimals: 18,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'DAI',
      collateralToken: 'DAI',
      description: '',
      collateralAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      rewardToken: ZERO_ADDRESS,
    },
    {
      symbol: 'USDC',
      address: '0xb241baed74a8b2199D4d516F20Ec529FBb32F3c7',
      decimals: 6,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'USDC',
      collateralToken: 'USDC',
      description: 'Used in RSV',
      collateralAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      rewardToken: ZERO_ADDRESS,
    },
    {
      symbol: 'USDT',
      address: '0xd73F2858A7Bf1d5Bc7523670c14F5EF4b7E37A54',
      decimals: 6,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'USDT',
      collateralToken: 'USDT',
      description: '',
      collateralAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      rewardToken: ZERO_ADDRESS,
    },
    {
      symbol: 'USDP',
      address: '0x45C515e8E7cB1543364303cfB1dDBA9B0Ad13de9',
      decimals: 18,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'USDP',
      collateralToken: 'USDP',
      description: 'Used in RSV',
      collateralAddress: '0x8E870D67F660D95d5be530380D0eC0bd388289E1',
      rewardToken: ZERO_ADDRESS,
    },
    {
      symbol: 'TUSD',
      address: '0x0023b264bDD45Dd95B12198A659109Edc3C8b9Bd',
      decimals: 18,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'TUSD',
      collateralToken: 'TUSD',
      description: 'Used in RSV',
      collateralAddress: '0x0000000000085d4780B73119b644AE5ecd22b376',
      rewardToken: ZERO_ADDRESS,
    },
    {
      symbol: 'BUSD',
      address: '0x22594aD1C779732E6D015712478445A68cC39fe4',
      decimals: 18,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'BUSD',
      collateralToken: 'BUSD',
      description: '',
      collateralAddress: '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
      rewardToken: ZERO_ADDRESS,
    },
    // YIELD TOKEN COLLATERAL
    {
      symbol: 'aDAI',
      address: '0x533BFe91fd2Db80A331e4FD815b19D052cbBA0Bf',
      decimals: 6,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'DAI',
      collateralToken: 'aDAI',
      description: '',
      collateralAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      rewardToken: STAKE_AAVE_ADDRESS[ChainId.Mainnet],
    },
    {
      symbol: 'aUSDC',
      address: '0xD995836dA78F416C4bD60Edd7EC1282Ec08a7e0C',
      decimals: 6,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'USDC',
      collateralToken: 'aUSDC',
      description: '',
      collateralAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      rewardToken: STAKE_AAVE_ADDRESS[ChainId.Mainnet],
    },
    {
      symbol: 'aUSDT',
      address: '0x75fAC74B93F9e919493cfb77099572AacAa67BD7',
      decimals: 6,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'USDT',
      collateralToken: 'aUSDT',
      description: '',
      collateralAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      rewardToken: STAKE_AAVE_ADDRESS[ChainId.Mainnet],
    },
    {
      symbol: 'aBUSD',
      address: '0x5f933959a92170B46AF82053d1Af289709f6A6f1',
      decimals: 18,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'BUSD',
      collateralToken: 'aBUSD',
      description: '',
      collateralAddress: '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
      rewardToken: STAKE_AAVE_ADDRESS[ChainId.Mainnet],
    },
    {
      symbol: 'cDAI',
      address: '0x52160CA2651CBEFCc6b603828290A67f80C14764',
      decimals: 6,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'DAI',
      collateralToken: 'cDAI',
      description: '',
      collateralAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      rewardToken: COMPOUND_ADDRESS[ChainId.Mainnet],
    },
    {
      symbol: 'cUSDC',
      address: '0xA5CBDe1A0FeB3112bBbe421226a24EF806A44a30',
      decimals: 6,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'USDC',
      collateralToken: 'cUSDC',
      description: '',
      collateralAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      rewardToken: COMPOUND_ADDRESS[ChainId.Mainnet],
    },
    {
      symbol: 'cUSDT',
      address: '0x94494d7C044Eb8847701C6e96B15d8FF78667623',
      decimals: 6,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'USDT',
      collateralToken: 'aUSDT',
      description: '',
      collateralAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      rewardToken: COMPOUND_ADDRESS[ChainId.Mainnet],
    },
    {
      symbol: 'cWBTC',
      address: '0x6C44A7270FCEd64Ca0A9A8c4DB998A8b218e9301',
      decimals: 18,
      targetUnit: TARGET_UNITS.BTC,
      referenceUnit: 'WBTC',
      collateralToken: 'cWBTC',
      description: '',
      collateralAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      rewardToken: COMPOUND_ADDRESS[ChainId.Mainnet],
    },
    {
      symbol: 'cETH',
      address: '0x1A406077d4BA972e2d879aA62D00BF553CdF6621',
      decimals: 18,
      targetUnit: TARGET_UNITS.ETH,
      referenceUnit: 'ETH',
      collateralToken: 'cETH',
      description: '',
      collateralAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      rewardToken: COMPOUND_ADDRESS[ChainId.Mainnet],
    },
    {
      symbol: 'wBTC',
      address: '0xC301E3299b2014f9Db052582978e7282f2c3119a',
      decimals: 6,
      targetUnit: TARGET_UNITS.BTC,
      referenceUnit: 'wBTC',
      collateralToken: 'wBTC',
      description: '',
      collateralAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      rewardToken: ZERO_ADDRESS,
    },
    {
      symbol: 'wETH',
      address: '0x7d61D0d965Db9ED75eb170742259c6F40AF31605',
      decimals: 18,
      targetUnit: TARGET_UNITS.ETH,
      referenceUnit: 'wETH',
      collateralToken: 'wETH',
      description: '',
      collateralAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      rewardToken: ZERO_ADDRESS,
    },
    {
      symbol: 'EURT',
      address: '0x650C62eC7aC3DB6d08fd922Cc859183Cd79903E7',
      decimals: 6,
      targetUnit: TARGET_UNITS.EUR,
      referenceUnit: 'EURT',
      collateralToken: 'EURT',
      description: '',
      collateralAddress: '0xC581b735A1688071A1746c968e0798D642EDE491',
      rewardToken: ZERO_ADDRESS,
    },
  ],
  [ChainId.Goerli]: [
    // FIAT COLLATERAL
    {
      symbol: 'DAI',
      address: '0xffef97179f58a582dEf73e6d2e4BcD2BDC8ca128',
      decimals: 18,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'DAI',
      collateralToken: 'DAI',
      description: 'Used in RSV',
      collateralAddress: '0xB2b615835F802E4eEa239D1F5Ec5fC85DEF14f9A',
      rewardToken: ZERO_ADDRESS,
    },
    {
      symbol: 'USDC',
      address: '0x529D7e23Ce63efdcE41dA2a41296Fd7399157F5b',
      decimals: 6,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'USDC',
      collateralToken: 'USDC',
      description: 'Used in RSV',
      collateralAddress: '0xE0914207d775FA217A07DFfDA71f9ab0427D9462',
      rewardToken: ZERO_ADDRESS,
    },
    {
      symbol: 'USDT',
      address: '0xd54804250E9C561AEa9Dee34e9cf2342f767ACC5',
      decimals: 6,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'USDT',
      collateralToken: 'USDT',
      description: 'Used in RSV',
      collateralAddress: '0x921469B843D10F8C55175a6a2Bc45EAe225E3fB2',
      rewardToken: ZERO_ADDRESS,
    },
    {
      symbol: 'USDP',
      address: '0xe664d294824C2A8C952A10c4034e1105d2907F46',
      decimals: 18,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'USDP',
      collateralToken: 'USDP',
      description: 'Used in RSV',
      collateralAddress: '0x921469B843D10F8C55175a6a2Bc45EAe225E3fB2',
      rewardToken: ZERO_ADDRESS,
    },
    {
      symbol: 'TUSD',
      address: '0x0938FA066054e5C7C47514e6010964713481eDFc',
      decimals: 18,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'TUSD',
      collateralToken: 'TUSD',
      description: 'Used in RSV',
      collateralAddress: '0x921469B843D10F8C55175a6a2Bc45EAe225E3fB2',
      rewardToken: ZERO_ADDRESS,
    },
    {
      symbol: 'BUSD',
      address: '0x8A458C9684c55ef52D560E28E9B27Af24eAE6e66',
      decimals: 18,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'BUSD',
      collateralToken: 'BUSD',
      description: 'Used in RSV',
      collateralAddress: '0x921469B843D10F8C55175a6a2Bc45EAe225E3fB2',
      rewardToken: ZERO_ADDRESS,
    },
    // YIELD TOKEN COLLATERAL
    {
      symbol: 'aDAI',
      address: '0x520CF948147C3DF196B8a21cd3687e7f17555032',
      decimals: 6,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'DAI',
      collateralToken: 'aDAI',
      description: 'Used in RSV',
      collateralAddress: '0xA348a2FDB75c8620558b329462c30DBA753A8A79',
      rewardToken: STAKE_AAVE_ADDRESS[CHAIN_ID],
    },
    {
      symbol: 'aUSDC',
      address: '0x73094D84683d712E02f47eddEfF70A6EDf6D59eD',
      decimals: 6,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'USDC',
      collateralToken: 'aUSDC',
      description: 'Used in RSV',
      collateralAddress: '0xE0914207d775FA217A07DFfDA71f9ab0427D9462',
      rewardToken: STAKE_AAVE_ADDRESS[CHAIN_ID],
    },
    {
      symbol: 'aUSDT',
      address: '0x5269bF9D2F5Aa32Bd290063B99814D7DA4AFa086',
      decimals: 6,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'USDT',
      collateralToken: 'aUSDT',
      description: 'Used in RSV',
      collateralAddress: '0x921469B843D10F8C55175a6a2Bc45EAe225E3fB2',
      rewardToken: STAKE_AAVE_ADDRESS[CHAIN_ID],
    },
    {
      symbol: 'aBUSD',
      address: '0x0F2717B041Ac182bc2A7FE6185602d9D2984E391',
      decimals: 18,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'BUSD',
      collateralToken: 'aBUSD',
      description: 'Used in RSV',
      collateralAddress: '0x921469B843D10F8C55175a6a2Bc45EAe225E3fB2',
      rewardToken: STAKE_AAVE_ADDRESS[CHAIN_ID],
    },
    {
      symbol: 'cDAI',
      address: '0x88CF647f1CE5a83E699157b9D84b5a39266F010D',
      decimals: 6,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'DAI',
      collateralToken: 'cDAI',
      description: 'Used in RSV',
      collateralAddress: '0xdc09753894a3F80B8D7EF1D6696ECc7fA3244C21',
      rewardToken: COMPOUND_ADDRESS[CHAIN_ID],
    },
    {
      symbol: 'cUSDC',
      address: '0xBE6F7489773bBB43991EdA6f4c9e02850094Cbb1',
      decimals: 6,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'USDC',
      collateralToken: 'cUSDC',
      description: 'Used in RSV',
      collateralAddress: '0xE0914207d775FA217A07DFfDA71f9ab0427D9462',
      rewardToken: COMPOUND_ADDRESS[CHAIN_ID],
    },
    {
      symbol: 'cUSDT',
      address: '0xd2783c5BD9bFE8bA09170828E120F49F1C76208c',
      decimals: 6,
      targetUnit: TARGET_UNITS.USD,
      referenceUnit: 'USDT',
      collateralToken: 'aUSDT',
      description: 'Used in RSV',
      collateralAddress: '0x921469B843D10F8C55175a6a2Bc45EAe225E3fB2',
      rewardToken: COMPOUND_ADDRESS[CHAIN_ID],
    },
    {
      symbol: 'cWBTC',
      address: '0x38c7e9427960E427f6c84b3A096021f47a9Afb82',
      decimals: 18,
      targetUnit: TARGET_UNITS.BTC,
      referenceUnit: 'WBTC',
      collateralToken: 'cWBTC',
      description: 'Used in RSV',
      collateralAddress: '0xa2fC3a92fDf545B4BC6a7bEE038Ab0e8e05a70a1',
      rewardToken: COMPOUND_ADDRESS[CHAIN_ID],
    },
    {
      symbol: 'cETH',
      address: '0xeA22abC49b4daDc189900AD6eE4033545468997e',
      decimals: 18,
      targetUnit: TARGET_UNITS.ETH,
      referenceUnit: 'ETH',
      collateralToken: 'cETH',
      description: 'Used in RSV',
      collateralAddress: '0x25d6C3deAe1Fc0530516Bce5459F458f0d7d7086',
      rewardToken: COMPOUND_ADDRESS[CHAIN_ID],
    },
    {
      symbol: 'wBTC',
      address: '0xe238999f9588c7c579A431143e909090FDCF28b5',
      decimals: 6,
      targetUnit: TARGET_UNITS.BTC,
      referenceUnit: 'wBTC',
      collateralToken: 'wBTC',
      description: 'Used in RSV',
      collateralAddress: '0xaFb62B600377010EC224B5b61973f67d2bACE909',
      rewardToken: ZERO_ADDRESS,
    },
    {
      symbol: 'wETH',
      address: '0x6AF7559e0e0FA720205eB34bf10a2e1de8AF3895',
      decimals: 18,
      targetUnit: TARGET_UNITS.ETH,
      referenceUnit: 'wETH',
      collateralToken: 'wETH',
      description: 'Used in RSV',
      collateralAddress: '0xaFb62B600377010EC224B5b61973f67d2bACE909',
      rewardToken: ZERO_ADDRESS,
    },
    {
      symbol: 'EURT',
      address: '0x78B6BD38a4bDDfB2D15cfBFE3bC048D262901DdA',
      decimals: 6,
      targetUnit: TARGET_UNITS.EUR,
      referenceUnit: 'EURT',
      collateralToken: 'EURT',
      description: 'Used in RSV',
      collateralAddress: '0x9fF645a81dF82C6eF09B596bE1736bFbc6B7dA90',
      rewardToken: ZERO_ADDRESS,
    },
  ],
}

export default collateralPlugins[CHAIN_ID] || []
