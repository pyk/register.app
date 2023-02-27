import styled from '@emotion/styled'
import { Trans } from '@lingui/macro'
import Account from 'components/account'
import ThemeColorMode from 'components/dark-mode-toggle/ThemeColorMode'
import useIsDeployer from 'hooks/useIsDeployer'
import useIsSidebarVisible from 'hooks/useIsSidebarVisible'
import ExternalArrowIcon from 'components/icons/ExternalArrowIcon'
import { Box, Flex, Text } from 'theme-ui'
import Brand from './Brand'
import TokenToggle from './TokenToggle'

const Container = styled(Flex)`
  align-items: center;
  flex-shrink: 0;
  position: relative;
  border-bottom: 1px solid var(--theme-ui-colors-border);
  height: 56px;
`

/**
 * Application header
 */
const AppHeader = () => {
  const isSidebarVisible = useIsSidebarVisible()
  const isDeployer = useIsDeployer()

  return (
    <Container px={[3, isSidebarVisible ? 5 : 7]}>
      <Box mr="auto" variant="layout.verticalAlign">
        <Brand mr={[2, 4]} />
        {isDeployer && (
          <Text sx={{ fontSize: 2 }} variant="subtitle">
            <Trans>RToken Deployer</Trans>
          </Text>
        )}
        {!isDeployer && <TokenToggle />}
      </Box>
      <Flex
        sx={{
          display: ['none', 'flex'],
          cursor: 'pointer',
          alignItems: 'center',
          flexDirection: 'row',
        }}
        onClick={() => window.open('https://reserve.org/protocol/', '_blank')}
      >
        <Text mr={1}>Docs</Text>
        <Box mt={2}>
          <ExternalArrowIcon />
        </Box>
      </Flex>
      <Box
        mx={4}
        sx={{
          backgroundColor: 'inputBorder',
          width: '1px',
          height: '16px',
          display: ['none', 'block'],
        }}
      ></Box>
      <ThemeColorMode pt={1} mr={[3, 0]} />
      {/* <Box ml={4} sx={{ alignItems: 'center', display: 'flex' }}>
        <LanguageSelector />
      </Box> */}
      <Box
        mx={4}
        sx={{
          backgroundColor: 'inputBorder',
          width: '1px',
          height: '16px',
          display: ['none', 'block'],
        }}
      ></Box>
      <Account />
    </Container>
  )
}

export default AppHeader
