import Analytics from 'components/analytics/Analytics'
import ToastContainer from 'components/toaster-container/ToastContainer'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Web3Provider from 'state/web3'
import { ThemeProvider } from 'theme-ui'
import { ROUTES } from 'utils/constants'
import Home from 'views/home'

import Layout from './components/layout'
import LanguageProvider from './i18n'
import { theme } from './theme'
// import Issuance from './views/issuance'
import React, { Suspense } from 'react'

const Overview = React.lazy(() => import('./views/overview'))
const Issuance = React.lazy(() => import('./views/issuance'))
const Staking = React.lazy(() => import('./views/staking'))
const Tokens = React.lazy(() => import('views/tokens/Tokens'))
const Updater = React.lazy(() => import('state/updater'))
const Auctions = React.lazy(() => import('views/auctions'))
const Deploy = React.lazy(() => import('views/deploy'))
const Settings = React.lazy(() => import('views/settings'))
const Governance = React.lazy(() => import('views/governance'))
const GovernanceSetup = React.lazy(
  () => import('views/deploy/components/Governance')
)
const GovernanceProposal = React.lazy(
  () => import('views/governance/views/proposal')
)
const GovernanceProposalDetail = React.lazy(
  () => import('views/governance/views/proposal-detail')
)

/**
 * App Entry point - Handles views routing
 *
 * @returns {JSX.Element}
 */
const App = () => (
  <Router>
    <Analytics />
    <ThemeProvider theme={theme}>
      <LanguageProvider>
        <ToastContainer />
        <Web3Provider>
          <Suspense>
            <Updater />
          </Suspense>
          <Layout>
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route
                path={ROUTES.OVERVIEW}
                element={
                  <Suspense>
                    <Overview />
                  </Suspense>
                }
              />
              <Route
                path={ROUTES.ISSUANCE}
                element={
                  <Suspense>
                    <Issuance />
                  </Suspense>
                }
              />
              <Route
                path={ROUTES.STAKING}
                element={
                  <Suspense>
                    <Staking />
                  </Suspense>
                }
              />
              <Route path={ROUTES.AUCTIONS} element={<Auctions />} />
              <Route
                path={ROUTES.DEPLOY}
                element={
                  <Suspense>
                    <Deploy />
                  </Suspense>
                }
              />
              <Route
                path={ROUTES.SETTINGS}
                element={
                  <Suspense>
                    <Settings />
                  </Suspense>
                }
              />
              <Route
                path={ROUTES.GOVERNANCE_SETUP}
                element={
                  <Suspense>
                    <GovernanceSetup />
                  </Suspense>
                }
              />

              <Route
                path={ROUTES.GOVERNANCE}
                element={
                  <Suspense>
                    <Governance />
                  </Suspense>
                }
              />
              <Route
                path={ROUTES.GOVERNANCE_PROPOSAL}
                element={
                  <Suspense>
                    <GovernanceProposal />
                  </Suspense>
                }
              />
              <Route
                path={`${ROUTES.GOVERNANCE_PROPOSAL}/:proposalId`}
                element={
                  <Suspense>
                    <GovernanceProposalDetail />
                  </Suspense>
                }
              />
              <Route
                path={ROUTES.TOKENS}
                element={
                  <Suspense>
                    <Tokens />
                  </Suspense>
                }
              />
            </Routes>
          </Layout>
        </Web3Provider>
      </LanguageProvider>
    </ThemeProvider>
  </Router>
)

export default App
