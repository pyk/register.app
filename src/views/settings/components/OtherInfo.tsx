import { t, Trans } from '@lingui/macro'
import { InfoItem } from 'components/info-box'
import useRToken from 'hooks/useRToken'
import { useAtomValue } from 'jotai'
import { rTokenParamsAtom } from 'state/atoms'
import { Card, Text, Divider } from 'theme-ui'
import { formatCurrency, parseDuration } from 'utils'

/**
 * View: Settings > Display RToken contracts configuration
 */
const OtherInfo = () => {
  const rToken = useRToken()
  const params = useAtomValue(rTokenParamsAtom)

  return (
    <Card p={4}>
      <Text variant="sectionTitle">
        <Trans>Other Parameters</Trans>
      </Text>
      <Divider mx={-4} my={4} sx={{ borderColor: 'darkBorder' }} />
      <InfoItem
        title={t`Short freeze duration`}
        subtitle={parseDuration(+params.shortFreeze || 0)}
        mb={3}
      />
      <InfoItem
        title={t`Long freeze duration`}
        subtitle={parseDuration(+params.longFreeze || 0)}
        mb={3}
      />
      <InfoItem
        title={t`Unstaking Delay`}
        subtitle={parseDuration(+params.unstakingDelay || 0)}
        mb={3}
      />
      <InfoItem
        title={t`Reward ratio`}
        subtitle={params.rewardRatio + '%'}
        mb={3}
      />
      <InfoItem
        title={t`Minimum trade volume`}
        subtitle={`$${formatCurrency(+params.minTrade)}`}
        mb={3}
      />
      <InfoItem
        title={t`RToken Maximum trade volume`}
        subtitle={`${formatCurrency(+params.minTrade)} ${rToken?.symbol}`}
      />
    </Card>
  )
}

export default OtherInfo
