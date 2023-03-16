import { Container } from 'components'
import { Box, Grid } from 'theme-ui'
import About from './components/about'
import Balances from './components/balances'
import Issue from './components/issue'
import Redeem from './components/redeem'

/**
 * Mint & Redeem view
 */
const Issuance = () => (
  <Container py={3}>
    <Grid columns={[1, 1, 1, '2fr 1.5fr']} gap={[3, 5]}>
      <Box>
        <Grid columns={[1, 2]} gap={[3, 4]} mb={[3, 4]}>
          <Issue />
          <Redeem />
        </Grid>
        <Balances />
      </Box>
      <About />
    </Grid>
  </Container>
)

export default Issuance
