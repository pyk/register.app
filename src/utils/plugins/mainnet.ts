import { CollateralPlugin } from 'types'
import {
  COMPOUND_ADDRESS,
  STAKE_AAVE_ADDRESS,
  ZERO_ADDRESS,
} from 'utils/addresses'
import { ChainId } from 'utils/chains'
import { TARGET_UNITS } from 'utils/constants'

const collateralAddresses = {
  DAI: '0x77CFE9fe00D45DF94a18aB34Af451199aAab2b5e',
  USDC: '0x9837ce9825d52672ca02533b5a160212bf901963',
  USDT: '0x8960ae89C8fEe76515c1Fa5DAbc100996E143798',
  USDP: '0xFDC36294aF736122456687D14DE7d42598319b7C',
  TUSD: '0x95171C5C8602F889fD052e978B4B2a8D56e357a5',
  BUSD: '0x9f99F37Fe0b419b3661403DeceA09bC44F615D46',
  aDAI: '0xF934c3dbD394E3D24DB539eF6c044a03090Cd702',
  aUSDC: '0xE5a1da41af2919A43daC3ea22C2Bdd230a3E19f5',
  aUSDT: '0x7FDbE32980861CC63751a0aEa5a5b3Ecb5119ACD',
  aUSDP: '0x1d51a359e113DBb71F3fE49108FF53990770b61c',
  cDAI: '0x2b28364A0E9c37BFb0685cB441f11D686F1a9b6c',
  cUSDC: '0x8a01936B12bcbEEC394ed497600eDe41D409a83F',
  cUSDT: '0x69Bd37B82794d64DC0C8c9652a6151f8954fD378',
  cUSDP: '0xe4c0Ba009782A8908A3821b4950d9d75ECdB2dA6',
  cWBTC: '0x03BCc97B6B0Bb7bc0D5497792F912A20bC64d162',
  cETH: '0xdDB74ee1Ce4fa8185217E73fD0666703f58c424C',
  WBTC: '0xA9C7aE7a71355E5D7A901fB5153D7339f7195A13',
  WETH: '0xB3522270B6d8a02AA6d789eA887B1D34af35A193',
  EURT: '0xb4eB87250Ecd8f32BeA775dA6D164D92A398d05b',
  fUSDC: '0x1289a753e0BaE82CF7f87747f22Eaf8E4eb7C216',
  fUSDT: '0x5F471bDE4950CdB00714A6dD033cA7f912a4f9Ee',
  fDAI: '0xA4410B71033fFE8fA41c6096332Be58E3641326d',
  wstETH: '0x47df1465672bFc4dC83f712531F7Eb1D658C0B66',
  rETH: '0x45B9BCc340AFF7497e6F06dE763B6A69644B4645',
  fFRAX: '0x5D7906a1E865dcc6f57ddcbAa0af698fB306b3F1',
  cUSDCv3: '0xB60A2dC7b1745aC00314c238ad2BBA05022ec1D1',
}

const underlyingCollateralAddresses = {
  DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  BUSD: '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
  USDP: '0x8E870D67F660D95d5be530380D0eC0bd388289E1',
  TUSD: '0x0000000000085d4780B73119b644AE5ecd22b376',
  aDAI: '0x028171bCA77440897B824Ca71D1c56caC55b68A3',
  aUSDC: '0xBcca60bB61934080951369a648Fb03DF4F96263C',
  aUSDT: '0x3Ed3B47Dd13EC9a98b44e6204A523E766B225811',
  aUSDP: '0x2e8F4bdbE3d47d7d7DE490437AeA9915D930F1A3',
  cDAI: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
  cUSDC: '0x39AA39c021dfbaE8faC545936693aC917d5E7563',
  cUSDT: '0xf650C3d88D12dB855b8bf7D11Be6C55A4e07dCC9',
  cUSDP: '0x041171993284df560249B57358F931D9eB7b925D',
  cETH: '0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5',
  cWBTC: '0xC11b1268C1A384e55C48c2391d8d480264A3A7F4',
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  WBTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  EURT: '0xC581b735A1688071A1746c968e0798D642EDE491',
  wstETH: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
  rETH: '0xae78736Cd615f374D3085123A210448E74Fc6393',
  fUSDC: '0x465a5a630482f3abD6d3b84B39B29b07214d19e5',
  fUSDT: '0x81994b9607e06ab3d5cF3AffF9a67374f05F27d7',
  fDAI: '0xe2bA8693cE7474900A045757fe0efCa900F6530b',
  fFRAX: '0x1C9A2d6b33B4826757273D47ebEe0e2DddcD978B',
  cUSDCv3: '0x77e9cBdD675D44Ac11aB3682AAb52B29cea9241B',
}

// MAINNET - ChainId = 1
const plugins: CollateralPlugin[] = [
  // FIAT COLLATERAL
  {
    symbol: 'DAI',
    address: collateralAddresses.DAI,
    decimals: 18,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'DAI',
    collateralToken: 'DAI',
    description: '',
    collateralAddress: underlyingCollateralAddresses.DAI,
    rewardToken: ZERO_ADDRESS,
  },
  {
    symbol: 'USDC',
    address: collateralAddresses.USDC,
    decimals: 6,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDC',
    collateralToken: 'USDC',
    description: 'Used in RSV',
    collateralAddress: underlyingCollateralAddresses.USDC,
    rewardToken: ZERO_ADDRESS,
  },
  {
    symbol: 'USDT',
    address: collateralAddresses.USDT,
    decimals: 6,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDT',
    collateralToken: 'USDT',
    description: '',
    collateralAddress: underlyingCollateralAddresses.USDT,
    rewardToken: ZERO_ADDRESS,
  },
  {
    symbol: 'USDP',
    address: collateralAddresses.USDP,
    decimals: 18,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDP',
    collateralToken: 'USDP',
    description: 'Used in RSV',
    collateralAddress: underlyingCollateralAddresses.USDP,
    rewardToken: ZERO_ADDRESS,
  },
  {
    symbol: 'TUSD',
    address: collateralAddresses.TUSD,
    decimals: 18,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'TUSD',
    collateralToken: 'TUSD',
    description: 'Used in RSV',
    collateralAddress: underlyingCollateralAddresses.TUSD,
    rewardToken: ZERO_ADDRESS,
  },
  {
    symbol: 'BUSD',
    address: collateralAddresses.BUSD,
    decimals: 18,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'BUSD',
    collateralToken: 'BUSD',
    description: '',
    collateralAddress: underlyingCollateralAddresses.BUSD,
    rewardToken: ZERO_ADDRESS,
  },
  // YIELD TOKEN COLLATERAL
  {
    symbol: 'saDAI',
    address: collateralAddresses.aDAI,
    decimals: 18,
    collateralDecimals: 18,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'DAI',
    collateralToken: 'aDAI',
    description: '',
    collateralAddress: underlyingCollateralAddresses.aDAI,
    depositContract: '0xF6147b4B44aE6240F7955803B2fD5E15c77bD7ea',
    rewardToken: STAKE_AAVE_ADDRESS[ChainId.Mainnet],
    underlyingToken: underlyingCollateralAddresses.DAI,
  },
  {
    symbol: 'saUSDC',
    address: collateralAddresses.aUSDC,
    decimals: 6,
    collateralDecimals: 6,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDC',
    collateralToken: 'aUSDC',
    description: '',
    collateralAddress: underlyingCollateralAddresses.aUSDC,
    depositContract: '0x8f471832C6d35F2a51606a60f482BCfae055D986',
    rewardToken: STAKE_AAVE_ADDRESS[ChainId.Mainnet],
    underlyingToken: underlyingCollateralAddresses.USDC,
  },
  {
    symbol: 'saUSDT',
    address: collateralAddresses.aUSDT,
    decimals: 6,
    collateralDecimals: 6,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDT',
    collateralToken: 'aUSDT',
    description: '',
    collateralAddress: underlyingCollateralAddresses.aUSDT,
    depositContract: '0x21fe646D1Ed0733336F2D4d9b2FE67790a6099D9',
    rewardToken: STAKE_AAVE_ADDRESS[ChainId.Mainnet],
    underlyingToken: underlyingCollateralAddresses.USDT,
  },
  {
    symbol: 'cDAI',
    address: collateralAddresses.cDAI,
    decimals: 6,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'DAI',
    collateralToken: 'cDAI',
    description: '',
    collateralAddress: underlyingCollateralAddresses.cDAI,
    rewardToken: COMPOUND_ADDRESS[ChainId.Mainnet],
  },
  {
    symbol: 'cUSDC',
    address: collateralAddresses.cUSDC,
    decimals: 6,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDC',
    collateralToken: 'cUSDC',
    description: '',
    collateralAddress: underlyingCollateralAddresses.cUSDC,
    rewardToken: COMPOUND_ADDRESS[ChainId.Mainnet],
  },
  {
    symbol: 'cUSDT',
    address: collateralAddresses.cUSDT,
    decimals: 6,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDT',
    collateralToken: 'cUSDT',
    description: '',
    collateralAddress: underlyingCollateralAddresses.cUSDT,
    rewardToken: COMPOUND_ADDRESS[ChainId.Mainnet],
  },
  {
    symbol: 'cWBTC',
    address: collateralAddresses.cWBTC,
    decimals: 18,
    targetUnit: TARGET_UNITS.BTC,
    referenceUnit: 'WBTC',
    collateralToken: 'cWBTC',
    description: '',
    collateralAddress: underlyingCollateralAddresses.cWBTC,
    rewardToken: COMPOUND_ADDRESS[ChainId.Mainnet],
  },
  {
    symbol: 'cETH',
    address: collateralAddresses.cETH,
    decimals: 18,
    targetUnit: TARGET_UNITS.ETH,
    referenceUnit: 'ETH',
    collateralToken: 'cETH',
    description: '',
    collateralAddress: underlyingCollateralAddresses.cETH,
    rewardToken: COMPOUND_ADDRESS[ChainId.Mainnet],
  },
  {
    symbol: 'wBTC',
    address: collateralAddresses.WBTC,
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
    address: collateralAddresses.WETH,
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
    address: collateralAddresses.EURT,
    decimals: 6,
    targetUnit: TARGET_UNITS.EUR,
    referenceUnit: 'EURT',
    collateralToken: 'EURT',
    description: '',
    collateralAddress: '0xC581b735A1688071A1746c968e0798D642EDE491',
    rewardToken: ZERO_ADDRESS,
  },
  {
    symbol: 'wstETH',
    address: collateralAddresses.wstETH,
    decimals: 18,
    targetUnit: TARGET_UNITS.ETH,
    referenceUnit: 'wETH',
    collateralToken: 'wstETH',
    description: '',
    collateralAddress: underlyingCollateralAddresses.wstETH,
    rewardToken: ZERO_ADDRESS,
  },
  {
    symbol: 'rETH',
    address: collateralAddresses.rETH,
    decimals: 18,
    targetUnit: TARGET_UNITS.ETH,
    referenceUnit: 'wETH',
    collateralToken: 'rETH',
    description: '',
    collateralAddress: underlyingCollateralAddresses.rETH,
    rewardToken: ZERO_ADDRESS,
  },
  {
    symbol: 'fUSDC',
    address: collateralAddresses.fUSDC,
    decimals: 6,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDC',
    collateralToken: 'fUSDC',
    description: '',
    collateralAddress: underlyingCollateralAddresses.fUSDC,
    rewardToken: ZERO_ADDRESS,
  },
  {
    symbol: 'fUSDT',
    address: collateralAddresses.fUSDT,
    decimals: 6,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDT',
    collateralToken: 'fUSDT',
    description: '',
    collateralAddress: underlyingCollateralAddresses.fUSDT,
    rewardToken: ZERO_ADDRESS,
  },
  {
    symbol: 'fDAI',
    address: collateralAddresses.fDAI,
    decimals: 18,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'DAI',
    collateralToken: 'fDAI',
    description: '',
    collateralAddress: underlyingCollateralAddresses.fDAI,
    rewardToken: ZERO_ADDRESS,
  },

  // Negligible volume, so disabling for now
  // {
  //   symbol: 'fFRAX',
  //   address: collateralAddresses.fFRAX,
  //   decimals: 18,
  //   targetUnit: TARGET_UNITS.USD,
  //   referenceUnit: 'FRAX',
  //   collateralToken: 'fFRAX',
  //   description: '',
  //   collateralAddress: underlyingCollateralAddresses.fFRAX,
  //   rewardToken: ZERO_ADDRESS,
  // },
  {
    symbol: 'cUSDCv3',
    address: collateralAddresses.cUSDCv3,
    decimals: 6,
    targetUnit: TARGET_UNITS.USD,
    referenceUnit: 'USDC',
    collateralToken: 'cUSDCv3',
    description: '',
    collateralAddress: underlyingCollateralAddresses.cUSDCv3,
    rewardToken: COMPOUND_ADDRESS[ChainId.Mainnet],
  },
]

export default plugins
