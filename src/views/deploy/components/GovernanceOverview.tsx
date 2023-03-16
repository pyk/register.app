import styled from '@emotion/styled'
import { Trans } from '@lingui/macro'
import CopyValue from 'components/button/CopyValue'
import GoTo from 'components/button/GoTo'
import GovernanceActionIcon from 'components/icons/GovernanceActionIcon'
import useRToken from 'hooks/useRToken'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, BoxProps, Button, Divider, Flex, Spinner, Text } from 'theme-ui'
import { formatCurrency, shortenString } from 'utils'
import { ROUTES, TRANSACTION_STATUS } from 'utils/constants'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'
import useGovernance, { useGovernanceTxState } from '../useGovernance'

const Container = styled(Box)`
  height: fit-content;
`

const GovernanceStatus = () => {
  const navigate = useNavigate()
  const rToken = useRToken()
  const { fee, deploy, isValid } = useGovernance()
  const tx = useGovernanceTxState()

  useEffect(() => {
    if (tx?.status === TRANSACTION_STATUS.CONFIRMED && rToken) {
      navigate(`${ROUTES.SETTINGS}?token=${rToken.address}`)
    }
  }, [tx?.status])

  if (
    tx?.status === TRANSACTION_STATUS.PENDING ||
    tx?.status === TRANSACTION_STATUS.SIGNING
  ) {
    return (
      <>
        <Spinner mt={3} size={24} mb={2} />
        <Text sx={{ fontWeight: 500, display: 'block' }}>
          <Trans>Pending, sign in wallet</Trans>
        </Text>
        <Text as="p" variant="legend">
          <Trans>
            Please sign the transaction in your wallet to continue with the
            government configuration process.
          </Trans>
        </Text>
      </>
    )
  }

  if (
    tx?.status === TRANSACTION_STATUS.MINING ||
    tx?.status === TRANSACTION_STATUS.CONFIRMED
  ) {
    return (
      <>
        <Spinner size={24} mt={3} mb={2} />
        <Text sx={{ fontWeight: 500, fontSize: 3, display: 'block' }} mb={2}>
          <Trans>Transaction submitted</Trans>
        </Text>
        <Text as="p" variant="legend">
          <Trans>
            Stay patient while the transaction is in progress & don’t close this
            window to avoid issues finding your way back here.
          </Trans>
        </Text>
        <Box
          variant="layout.verticalAlign"
          sx={{ justifyContent: 'center' }}
          mt={4}
        >
          <Text variant="legend">{shortenString(tx?.hash ?? '')}</Text>
          <CopyValue ml={3} mr={2} value={tx?.hash ?? ''} />
          <GoTo
            href={getExplorerLink(tx?.hash ?? '', ExplorerDataType.TRANSACTION)}
          />
        </Box>
      </>
    )
  }

  return (
    <>
      <Text variant="legend" as="p" sx={{ textAlign: 'center' }}>
        RToken will be ready to use after this TX if you choose to unpause.
      </Text>
      <Button
        onClick={deploy}
        variant="accentAction"
        disabled={!isValid || !fee}
        mt={4}
        sx={{ width: '100%' }}
      >
        <Trans>Deploy Governance</Trans>
      </Button>
      <Box mt={3} sx={{ fontSize: 1, textAlign: 'center' }}>
        <Text variant="legend" mr={1}>
          <Trans>Estimated gas cost:</Trans>
          {!isValid && ' --'}
        </Text>
        {isValid && !fee && <Spinner color="black" size={12} />}
        {isValid && !!fee && (
          <Text sx={{ fontWeight: 500 }}>${formatCurrency(fee)}</Text>
        )}
      </Box>
    </>
  )
}

const GovernanceOverview = (props: BoxProps) => (
  <Container variant="layout.borderBox" {...props}>
    <Flex
      sx={{
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
      }}
      py={2}
    >
      <GovernanceActionIcon />
      <Text variant="title" mt={2} mb={1}>
        <Trans>Tx2. Governance</Trans>
      </Text>
      <GovernanceStatus />
    </Flex>
    <Divider my={4} mx={-4} />
    <Box>
      <Text variant="strong" mb={2}>
        Not ready to set up governance?
      </Text>
      <Text as="p" variant="legend">
        You can leave your RToken paused and come back to setting up governance
        later.
      </Text>
    </Box>
  </Container>
)

export default GovernanceOverview
