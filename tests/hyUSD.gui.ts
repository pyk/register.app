import { test } from '@guardianui/test'
import { setAllowanceAtSlot, setBalanceAtSlot } from './utils'

test('Mint hyUSD', async ({ page, gui }) => {
  // Fork Mainnet
  await gui.initializeChain(1, 17550440)

  // Go to eUSDC mint page
  await page.goto(
    'http://localhost:3000/#/issuance?token=0xaCdf0DBA4B9839b96221a8487e9ca660a48212be'
  )

  // Block unnecessary http requests to speed up the tests
  await page.route('**/*.{png,jpg,jpeg,webp}', (route) => route.abort())
  await page.route(/(analytics|font|thegraph)/, (route) => route.abort())

  // Mock balances
  await gui.setEthBalance('100000000000000000000000')
  await setBalanceAtSlot({
    token: '0x465a5a630482f3abd6d3b84b39b29b07214d19e5', // fUSDC
    slotNumber: '14',
    value: '10000000000000000000000',
    gui,
  })
  await setBalanceAtSlot({
    token: '0xe2ba8693ce7474900a045757fe0efca900f6530b', // fDAI
    slotNumber: '14',
    value: '10000000000000000000000',
    gui,
  })
  await setBalanceAtSlot({
    token: '0x8e074d44aabc1b3b4406fe03da7cef787ea85938', // cvxeUSD3CRV-f
    slotNumber: '0',
    value: '10000000000000000000000',
    gui,
  })
  await setBalanceAtSlot({
    token: '0xabb54222c2b77158cc975a2b715a3d703c256f05', // cvxMIM-3LP3CRV-f
    slotNumber: '0',
    value: '10000000000000000000000',
    gui,
  })

  await page
    .getByRole('button', { name: 'Wrap/unwrap Convex LP tokens', exact: true })
    .click()
  await page.getByText('Max: 10,000').nth(0).click({ timeout: 60_000 })
  await page.getByText('Estimated gas cost:$').waitFor({ timeout: 60_000 })
  await gui.validateContractInteraction(
    'div:has-text("Approve") >> button >> nth=1',
    '0xbf2fbeecc974a171e319b6f92d8f1d042c6f1ac3'
  )
  await gui.validateContractInteraction(
    'button >> span:has-text("Wrap tokens") >> nth=0',
    '0xbf2fbeecc974a171e319b6f92d8f1d042c6f1ac3'
  )
  await page
    .locator('reach-portal')
    .filter({ hasText: 'Transactions signed!' })
    .locator('button')
    .click()

  await page
    .getByRole('button', { name: 'Wrap/unwrap Convex LP tokens', exact: true })
    .click()
  await page.getByPlaceholder('Input token amount').nth(2).type('10000')
  await page.getByText('Estimated gas cost:$').waitFor({ timeout: 90_000 })
  await gui.validateContractInteraction(
    'div:has-text("Approve") >> button >> nth=1',
    '0x8443364625e09a33d793acd03acc1f3b5dbfa6f6'
  )
  await gui.validateContractInteraction(
    'button >> span:has-text("Wrap tokens") >> nth=0',
    '0x8443364625e09a33d793acd03acc1f3b5dbfa6f6'
  )
  await page
    .locator('reach-portal')
    .filter({ hasText: 'Transactions signed!' })
    .locator('button')
    .click()

  // NOTE:
  // We need to bypass the allowance because we cannot approve
  // the collateral token one by one via the UI. The guardiantest hangs when
  // handling multiple transaction confirmations.

  await setAllowanceAtSlot({
    token: '0x465a5a630482f3abd6d3b84b39b29b07214d19e5', // fUSDC
    spender: '0xaCdf0DBA4B9839b96221a8487e9ca660a48212be',
    slotNumber: '15',
    value: '10000000000000000000000',
    gui,
  })
  await setAllowanceAtSlot({
    token: '0xe2ba8693ce7474900a045757fe0efca900f6530b', // fDAI
    spender: '0xaCdf0DBA4B9839b96221a8487e9ca660a48212be',
    slotNumber: '15',
    value: '10000000000000000000000',
    gui,
  })
  await setAllowanceAtSlot({
    token: '0xbf2fbeecc974a171e319b6f92d8f1d042c6f1ac3', // stkcvxeUSD3CRV-f
    spender: '0xaCdf0DBA4B9839b96221a8487e9ca660a48212be',
    slotNumber: '1',
    value: '10000000000000000000000',
    gui,
  })
  await setAllowanceAtSlot({
    token: '0x8443364625e09a33d793acd03acc1f3b5dbfa6f6', // stkcvxMIM-3LP3CRV-f
    spender: '0xaCdf0DBA4B9839b96221a8487e9ca660a48212be',
    slotNumber: '1',
    value: '10000000000000000000000',
    gui,
  })

  await page.getByPlaceholder('Mint amount').type('10000')
  await page
    .getByText('Missing collateral')
    .waitFor({ state: 'hidden', timeout: 60_000 })

  await page.getByRole('button', { name: '+ Mint hyUSD' }).click()
  await page.getByText('Collateral distribution').click()
  await gui.validateContractInteraction(
    'button >> span:has-text("Begin minting 10,000 hyUSD") >> nth=0',
    '0xaCdf0DBA4B9839b96221a8487e9ca660a48212be'
  )
})
