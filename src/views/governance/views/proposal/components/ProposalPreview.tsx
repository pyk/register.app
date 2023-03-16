import { Box, BoxProps } from 'theme-ui'
import ProposedBackupPreview from './ProposedBackupPreview'
import ProposedBasketPreview from './ProposedBasketPreview'
import ProposedParametersPreview from './ProposedParametersPreview'
import ProposedRevenueSplitPreview from './ProposedRevenueSplitPreview'
import ProposedRolesPreview from './ProposedRolesPreview'

const ProposalPreview = (props: BoxProps) => (
  <Box {...props}>
    <ProposedBasketPreview mt={4} />
    <ProposedBackupPreview mt={4} />
    <ProposedRevenueSplitPreview mt={4} />
    <ProposedParametersPreview mt={4} />
    <ProposedRolesPreview mt={4} />
  </Box>
)

export default ProposalPreview
