import { t, Trans } from '@lingui/macro'
import { Field, FormField } from 'components/field'
import { useFormContext } from 'react-hook-form'
import {
  Box,
  BoxProps,
  Card,
  Flex,
  Select,
  Switch,
  Text,
  Image,
  Divider,
} from 'theme-ui'
import { addressPattern } from 'utils'
import GovernanceParameters from './GovernanceParameters'
import DocsLink from 'components/docs-link/DocsLink'

interface Props extends BoxProps {
  disabled?: boolean
}

const GovernanceSetup = ({ disabled = false, ...props }: Props) => {
  const { register, watch } = useFormContext()
  const defaultGovernance = watch('defaultGovernance')
  const unfreeze = watch('unfreeze')

  return (
    <Card p={4} {...props}>
      <Box variant="layout.verticalAlign">
        <Text variant="sectionTitle">
          <Trans>Governance</Trans>
        </Text>
        <DocsLink link="https://reserve.org/protocol/reserve_rights_rsr/#reserve-rights-governance" />
      </Box>
      <Divider my={4} mx={-4} sx={{ borderColor: 'darkBorder' }} />
      <Box mb={5}>
        <Image src="/svgs/governance.svg" />
        <Box>
          <Text variant="title" sx={{ display: 'block' }} mb={2}>
            <Trans>Use the Alexios governor format?</Trans>
          </Text>
          <Text variant="legend">
            <Trans>
              Choose between our Alexios Governor and anything between one man
              rule to arbitrary DAO structure under your defined Ethereum
              address.
            </Trans>
          </Text>
        </Box>
        <Box ml="auto" mt={3}>
          <Switch
            defaultChecked={defaultGovernance}
            {...register('defaultGovernance')}
          />
        </Box>
      </Box>
      <Divider my={4} mx={-4} sx={{ borderColor: 'darkBorder' }} />
      <Text variant="title" mb={4}>
        <Trans>Permissions</Trans>
      </Text>
      {!defaultGovernance && (
        <FormField
          label={t`Owner address`}
          placeholder={t`Input owner ethereum address`}
          mb={3}
          name="owner"
          options={{
            required: true,
            pattern: {
              value: addressPattern,
              message: t`Invalid ethereum address`,
            },
          }}
        />
      )}
      <FormField
        label={t`Guardian address`}
        placeholder={t`Input the guardian ethereum address`}
        help={t`Testing`}
        mb={3}
        name="guardian"
        options={{
          disabled,
          required: true,
          pattern: {
            value: addressPattern,
            message: t`Invalid ethereum address`,
          },
        }}
      />
      <FormField
        label={t`Pauser address`}
        placeholder={t`Input pauser ethereum address`}
        mb={4}
        name="pauser"
        options={{
          disabled,
          required: true,
          pattern: {
            value: addressPattern,
            message: t`Invalid ethereum address`,
          },
        }}
      />
      <Divider my={4} mx={-4} sx={{ borderColor: 'darkBorder' }} />
      {defaultGovernance && <GovernanceParameters />}
      <Divider my={4} mx={-4} sx={{ borderColor: 'darkBorder' }} />
      <Text variant="title" mb={4}>
        <Trans>Initial RToken state after deployment</Trans>
      </Text>
      <Field label={t`Pause status`}>
        <Select {...register('unpause')}>
          <option value={0}>
            <Trans>RToken will be left in pause state</Trans>
          </option>
          <option value={1}>
            <Trans>RToken will be fully functional</Trans>
          </option>
        </Select>
        {unfreeze === '0' && (
          <Text
            sx={{ color: 'warning', display: 'block', fontSize: 1 }}
            mt={1}
            ml={1}
          >
            <Trans>
              Only the guardian address or governance will be able to unpause
            </Trans>
          </Text>
        )}
      </Field>
    </Card>
  )
}

export default GovernanceSetup
