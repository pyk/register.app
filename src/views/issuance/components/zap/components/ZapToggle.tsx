import { Trans } from '@lingui/macro'
import { useAtom } from 'jotai'
import { Zap as ZapIcon } from 'react-feather'
import { Box, Switch, Text } from 'theme-ui'
import { zapEnabledAtom } from '../state/ui-atoms'

const ZapToggle = () => {
  const [zapEnabled, setEnabled] = useAtom(zapEnabledAtom)

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnabled(e.target.checked)
  }

  return (
    <Box
      variant={zapEnabled ? "none" : "layout.borderBox"}
      sx={{display: 'flex', alignItems: 'center'}}
      mb={zapEnabled ? [1, 2] : [1, 4]}
      p={3}
      mt={[2, 0]}
    >
      <ZapIcon size={18} />
      <Text ml={2}>
        <Trans>Turn on Zaps to mint using 1 asset</Trans>
      </Text>
      <Box ml="auto">
        <label>
          <Switch sx={{ background: 'secondary'}} defaultChecked={zapEnabled} onChange={handleToggle} />
        </label>
      </Box>
    </Box>
  )
}

export default ZapToggle
