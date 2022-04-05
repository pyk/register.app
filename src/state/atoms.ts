import { atomWithImmer } from 'jotai/immer'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { MulticallState, RawCall, ReserveToken, Wallet } from 'types'

export const reserveTokensAtom = atomWithStorage<{ [x: string]: ReserveToken }>(
  'reserveTokens',
  {}
)
export const selectedRTokenAtom = atomWithStorage('selectedRToken', '')
export const rTokenAtom = atom<ReserveToken | null>(
  (get) => get(reserveTokensAtom)[get(selectedRTokenAtom)]
)

export const walletsAtom = atomWithStorage<{ [x: string]: Wallet }>(
  'wallets',
  {}
)
export const selectedAccountAtom = atomWithStorage('trackedAccount', '')
export const walletAtom = atom<Wallet | null>(
  (get) => get(walletsAtom)[get(selectedAccountAtom)]
)

export const balancesAtom = atom<{ [x: string]: number }>({})

// Calls state
export const callsAtom = atomWithImmer<RawCall[]>([])
export const multicallStateAtom = atom<MulticallState>({})
