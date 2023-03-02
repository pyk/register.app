import { Trans } from '@lingui/macro'
import GoTo from 'components/button/GoTo'
import Popup from 'components/popup'
import { useState } from 'react'
import { Box, Card, Text } from 'theme-ui'
import { shortenAddress } from 'utils'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'

const RoleList = ({ roles }: { roles: string[] }) => {
  return (
    <Card>
      {roles.map((address, index) => (
        <Box mt={index ? 2 : 0} variant="layout.verticalAlign" key={address}>
          <Text mr={1}>{shortenAddress(address)}</Text>
          <GoTo
            ml="auto"
            href={getExplorerLink(address, ExplorerDataType.ADDRESS)}
          />
        </Box>
      ))}
    </Card>
  )
}

/**
 * View: Settings > Display RToken role list
 */
const RolesView = ({ roles }: { roles: string[] }) => {
  const [isVisible, setVisible] = useState(false)

  if (roles.length <= 1) {
    return (
      <Box variant="layout.verticalAlign">
        <Text sx={{ fontSize: 1 }}>
          {roles[0] ? shortenAddress(roles[0]) : 'None'}
        </Text>
        {!!roles[0] && (
          <GoTo
            ml={1}
            href={getExplorerLink(roles[0], ExplorerDataType.ADDRESS)}
          />
        )}
      </Box>
    )
  }

  return (
    <Popup
      show={isVisible}
      onDismiss={() => setVisible(false)}
      content={<RoleList roles={roles} />}
    >
      <Text
        as="a"
        sx={{ textDecoration: 'underline', cursor: 'pointer' }}
        onClick={() => setVisible(!isVisible)}
      >
        <Trans>View</Trans>
      </Text>
    </Popup>
  )
}

export default RolesView
