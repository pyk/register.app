import { AddressMap } from 'types'
import { ChainId } from 'utils/chains'
import tokenList from 'utils/rtokens'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const FURNACE_ADDRESS = '0x0000000000000000000000000000000000000001'
export const ST_RSR_ADDRESS = '0x0000000000000000000000000000000000000002'

/**
 * Protocol related contracts
 */
export const DEPLOYER_ADDRESS: AddressMap = {
  [ChainId.Mainnet]: '0x5c46b718Cd79F2BBA6869A3BeC13401b9a4B69bB',
  [ChainId.Goerli]: '0x0F53Aba2a7354C86B64dcaEe0ab9BF852846bAa5',
  [ChainId.Hardhat]: '0x139e1D41943ee15dDe4DF876f9d0E7F85e26660A',
}

export const FACADE_ADDRESS: AddressMap = {
  [ChainId.Mainnet]: '0xf535Cab96457558eE3eeAF1402fCA6441E832f08',
  [ChainId.Goerli]: '0x7F9999B2C9D310a5f48dfD070eb5129e1e8565E2',
  [ChainId.Hardhat]: '0xf535Cab96457558eE3eeAF1402fCA6441E832f08',
}

export const FACADE_ACT_ADDRESS: AddressMap = {
  [ChainId.Mainnet]: '0x933c5DBdA80f03C102C560e9ed0c29812998fA78',
  [ChainId.Goerli]: '0xafd16aFdE22D42038223A6FfDF00ee49c8fDa985',
  [ChainId.Hardhat]: '0x6FE56A3EEa3fEc93601a94D26bEa1876bD48192F',
}

export const FACADE_WRITE_ADDRESS: AddressMap = {
  [ChainId.Mainnet]: '0x1656D8aAd7Ee892582B9D5c2E9992d9f94ff3629',
  [ChainId.Goerli]: '0x97C75046CE7Ea5253d20A35B3138699865E8813f',
  [ChainId.Hardhat]: '0xF7bd1F8FdE9fBdc8436D45594e792e014c5ac966',
}

/**
 * RSV Related contracts
 */
export const RSV_ADDRESS: AddressMap = {
  [ChainId.Mainnet]: '0x196f4727526eA7FB1e17b2071B3d8eAA38486988',
  [ChainId.Goerli]: '0xC54cA3D2A4fE68D079b45c92D703DADfE3Ad0AA0',
  [ChainId.Hardhat]: '0x196f4727526eA7FB1e17b2071B3d8eAA38486988',
}

export const RSV_MANAGER_ADDRESS: AddressMap = {
  [ChainId.Mainnet]: '0x4B481872f31bab47C6780D5488c84D309b1B8Bb6',
  [ChainId.Goerli]: '0x08d95a020cE6FCfF46ACb323E2416Bc847D68b9a',
  [ChainId.Hardhat]: '0x4B481872f31bab47C6780D5488c84D309b1B8Bb6',
}

/**
 * Collateral reward assets
 */
export const STAKE_AAVE_ADDRESS: AddressMap = {
  [ChainId.Mainnet]: '0x5cAF60bf01A5ecd436b2Cd0b68e4c04547eCb872',
  [ChainId.Goerli]: '0x3ddc60c2dFa57F78972466ca805C9dA69795FdB7',
  [ChainId.Hardhat]: '0x5cAF60bf01A5ecd436b2Cd0b68e4c04547eCb872',
}

export const COMPOUND_ADDRESS: AddressMap = {
  [ChainId.Mainnet]: '0x159Af360D99b3dd6c4a47Cd08b730Ff7C9d113CC',
  [ChainId.Goerli]: '0x0F875eE2b36a7B6BdF6c9cb5f2f608E287C3d619',
  [ChainId.Hardhat]: '0x159Af360D99b3dd6c4a47Cd08b730Ff7C9d113CC',
}

export const CVX_ADDRESS: AddressMap = {
  [ChainId.Mainnet]: '0xbE301280e593d1665A2D54DA65687E92f46D5c44',
  [ChainId.Goerli]: '0xbE301280e593d1665A2D54DA65687E92f46D5c44',
  [ChainId.Hardhat]: '0xbE301280e593d1665A2D54DA65687E92f46D5c44',
}

export const CRV_ADDRESS: AddressMap = {
  [ChainId.Mainnet]: '0x3752098adf2C9E1E17e48D9cE2Ea48961905064A',
  [ChainId.Goerli]: '0x3752098adf2C9E1E17e48D9cE2Ea48961905064A',
  [ChainId.Hardhat]: '0x3752098adf2C9E1E17e48D9cE2Ea48961905064A',
}

/**
 * ERC20 token addresses
 */
export const RSR_ADDRESS: AddressMap = {
  [ChainId.Mainnet]: '0x320623b8E4fF03373931769A31Fc52A4E78B5d70',
  [ChainId.Goerli]: '0xB58b5530332D2E9e15bfd1f2525E6fD84e830307',
  [ChainId.Hardhat]: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
}

export const USDC_ADDRESS: AddressMap = {
  [ChainId.Mainnet]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  [ChainId.Goerli]: '0xfd7201C314532c4eF42CBF3fcB4A2f9CfCe0f57A',
  [ChainId.Hardhat]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
}

export const WETH_ADDRESS: AddressMap = {
  [ChainId.Mainnet]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  [ChainId.Goerli]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  [ChainId.Hardhat]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
}

export const EUSD_ADDRESS: AddressMap = {
  [ChainId.Mainnet]: '0xA0d69E286B938e21CBf7E51D71F6A4c8918f482F',
  [ChainId.Goerli]: '0xA0d69E286B938e21CBf7E51D71F6A4c8918f482F',
  [ChainId.Hardhat]: '0xA0d69E286B938e21CBf7E51D71F6A4c8918f482F',
}

/**
 * Other contract addresses
 */
export const MULTICALL_ADDRESS: AddressMap = {
  [ChainId.Mainnet]: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  [ChainId.Goerli]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.Hardhat]: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
}

export const ORACLE_ADDRESS: AddressMap = {
  [ChainId.Mainnet]: '0x8263e161A855B644f582d9C164C66aABEe53f927',
  [ChainId.Goerli]: '0x8263e161A855B644f582d9C164C66aABEe53f927',
  [ChainId.Hardhat]: '0x8263e161A855B644f582d9C164C66aABEe53f927',
}

export const ENS_ADDRESS: AddressMap = {
  [ChainId.Mainnet]: '0x3671aE578E63FdF66ad4F3E12CC0c0d71Ac7510C',
  [ChainId.Goerli]: '0x333Fc8f550043f239a2CF79aEd5e9cF4A20Eb41e',
  [ChainId.Hardhat]: '0x3671aE578E63FdF66ad4F3E12CC0c0d71Ac7510C',
}

// Fixed tokens used in the rtoken selector screen and dashboard
// TODO: Change this
export const DEFAULT_TOKENS = {
  [ChainId.Mainnet]: Object.keys(tokenList),
  [ChainId.Goerli]: [RSV_ADDRESS[ChainId.Goerli]],
  [ChainId.Hardhat]: [],
}
