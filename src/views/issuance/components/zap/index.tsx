import { t, Trans } from '@lingui/macro'
import { NumericalInput } from 'components'
import { LoadingButton } from 'components/button'
import { MaxLabel } from 'components/transaction-input'
import useBlockNumber from 'hooks/useBlockNumber'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { Zap as ZapIcon } from 'react-feather'
import { gasPriceAtomBn } from 'state/atoms'
import { Box, Card, Flex, Grid, Switch, Text } from 'theme-ui'
import ZapTokenSelector from './components/ZapTokenSelector'
import { ui, zapAvailableAtom, zapEnabledAtom } from './state/ui-atoms'
import { resolvedZapState, zapperState } from './state/zapper'

const ZapTextInputField = () => {
  const [[textInput, disabled], onChange] = useAtom(ui.input.textInput)
  return (
    <NumericalInput
      placeholder={t`Zap amount`}
      value={textInput}
      disabled={disabled}
      onChange={onChange}
    />
  )
}

const TransactionFee = () => (
  <Text
    as="span"
    variant="legend"
    sx={{ display: 'block', fontSize: 1 }}
    ml="auto"
    mr={2}
  >
    {useAtomValue(ui.output.txFee)}
  </Text>
)

const ZapInput = () => (
  <Flex sx={{ alignItems: 'center' }}>
    <ZapTextInputField />
    <Box mr={2} />
    <ZapTokenSelector />
  </Flex>
)

const ZapOutput = () => (
  <NumericalInput
    disabled={true}
    placeholder={'0.0'}
    value={useAtomValue(ui.output.textBox)}
    onChange={() => {}}
  />
)

const ZapMaxInput = () => {
  const [maxAmountString, setToMax] = useAtom(ui.input.maxAmount)
  if (maxAmountString == null) {
    return null
  }
  return (
    <MaxLabel
      text={`Max: ${maxAmountString}`}
      handleClick={setToMax}
      clickable={true}
      compact
    />
  )
}

const ZapButton = () => {
  const [{ loading, enabled, label, loadingLabel }, onClick] = useAtom(
    ui.button
  )

  return (
    <LoadingButton
      loading={loading}
      disabled={!enabled}
      text={label}
      loadingText={loadingLabel}
      mt={3}
      sx={{ width: '100%' }}
      onClick={onClick}
    />
  )
}

const UpdateBlockAndGas = () => {
  const zapState = useAtomValue(resolvedZapState)
  const block = useBlockNumber()
  const gasPriceBn = useAtomValue(gasPriceAtomBn)
  useEffect(() => {
    if (zapState == null || block == null || gasPriceBn == null) return
    if (block === zapState.currentBlock || gasPriceBn.eq(zapState.gasPrice))
      return
    zapState.updateBlockState(block, gasPriceBn.toBigInt())
  }, [zapState, block, gasPriceBn])
  return null
}

/**
 * Zap widget
 */
const Zap = () => {
  const zapState = useAtomValue(zapperState)
  if (zapState.state === 'loading') {
    return (
      <Card p={4}>
        <Text>Loading token Zap</Text>
      </Card>
    )
  }
  if (zapState.state === 'hasError') {
    return null
  }
  return (
    <>
      <UpdateBlockAndGas />
      <Card p={4} mb={4}>
        <Grid columns={1} gap={2}>
          <Text ml={3} as="label" variant="legend">
            <Trans>Mint using Zap</Trans>
          </Text>
          <ZapInput />
          <ZapMaxInput />
          <Box mt={2} />
          <ZapOutput />
          <TransactionFee />
          <ZapButton />
        </Grid>
      </Card>
    </>
  )
}

const ZapToggle = () => {
  const [zapEnabled, setEnabled] = useAtom(zapEnabledAtom)

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnabled(e.target.checked)
  }

  return (
    <Box
      variant="layout.verticalAlign"
      mb={4}
      pb={3}
      sx={{ borderBottom: '1px solid', borderColor: 'border' }}
    >
      <ZapIcon size={14} />
      <Text ml={2}>
        <Trans>Turn on Zaps to mint from 1 asset</Trans>
      </Text>
      <Box ml="auto">
        <label>
          <Switch defaultChecked={zapEnabled} onChange={handleToggle} />
        </label>
      </Box>
    </Box>
  )
}

export default () => {
  const zapAvailable = useAtomValue(zapAvailableAtom)
  const zapEnabled = useAtomValue(zapEnabledAtom)

  if (!zapAvailable) {
    return null
  }

  return (
    <>
      <ZapToggle />
      {zapEnabled && <Zap />}
    </>
  )
}
