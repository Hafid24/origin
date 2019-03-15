import txHelper, { checkMetaMask } from '../_txHelper'
import contracts from '../../contracts'

async function updateTokenAllowance(_, { token, from, to, value }) {
  let tokenContract = contracts.tokens.find(t => t.id === token)
  if (token.indexOf('token-') === 0) {
    tokenContract = contracts.tokens.find(
      t => t.symbol === token.split('token-')[1]
    )
  }
  if (!tokenContract) {
    throw new Error('Could not find contract to update allowance')
  }
  if (to === 'marketplace') {
    to = contracts.marketplace.options.address
  }
  await checkMetaMask(from)
  // value = contracts.web3.utils.toWei(value, 'ether')
  const tx = tokenContract.contractExec.methods.approve(to, value).send({
    gas: 4612388,
    from
  })
  return txHelper({ tx, from, mutation: 'transferToken' })
}

export default updateTokenAllowance
