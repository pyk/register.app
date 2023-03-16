import { Trans } from '@lingui/macro'
import RTokenSelector from 'components/rtoken-selector'
import useRToken from 'hooks/useRToken'
import { useAtomValue } from 'jotai'
import { AlertCircle } from 'react-feather'
import { rTokenBasketStatusAtom, rTokenStatusAtom } from 'state/atoms'
import { Box, Text } from 'theme-ui'
import { COLLATERAL_STATUS } from 'utils/constants'

const RTokenStatus = () => {
  const rToken = useRToken()
  const { paused, frozen } = useAtomValue(rTokenStatusAtom)
  const basketStatus = useAtomValue(rTokenBasketStatusAtom)

  if (!rToken || rToken.isRSV) {
    return null
  }

  if (paused || frozen) {
    return (
      <Box
        variant="layout.verticalAlign"
        ml={3}
        sx={{ color: frozen ? 'danger' : 'warning' }}
      >
        <AlertCircle size={16} />
        <Text
          ml={2}
          sx={{
            fontSize: 1,
            display: ['none', 'inline-block'],
            textTransform: 'uppercase',
          }}
        >
          {frozen ? (
            <Trans>RToken is frozen</Trans>
          ) : (
            <Trans>RToken is paused</Trans>
          )}
        </Text>
      </Box>
    )
  }

  if (!!basketStatus) {
    return (
      <Box
        variant="layout.verticalAlign"
        ml={3}
        sx={{
          color:
            basketStatus === COLLATERAL_STATUS.DEFAULT ? 'danger' : 'warning',
        }}
      >
        <AlertCircle size={16} />
        <Text
          ml={2}
          sx={{
            fontSize: 1,
            textTransform: 'uppercase',
            display: ['none', 'inline-block'],
          }}
        >
          {basketStatus === COLLATERAL_STATUS.DEFAULT ? (
            <Trans>Basket defaulted</Trans>
          ) : (
            <Trans>Basket iffy</Trans>
          )}
        </Text>
      </Box>
    )
  }

  return null
}

const TokenToggle = () => (
  <>
    <RTokenSelector />
    <RTokenStatus />
  </>
)

export default TokenToggle
