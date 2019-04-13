import { exchangeAbi, exchangeBytecode } from '../../contracts/UniswapExchange'
import txHelper, { checkMetaMask } from '../_txHelper'
import contracts from '../../contracts'

const isBrowser = typeof window !== 'undefined'

async function uniswapDeployExchangeTemplate(_, { from }) {
  const web3 = contracts.web3Exec
  await checkMetaMask(from)
  const Contract = new web3.eth.Contract(exchangeAbi)
  const tx = Contract.deploy({ data: exchangeBytecode }).send({
    gas: 5500000,
    from
  })

  return txHelper({
    tx,
    from,
    mutation: 'uniswapDeployFactory',
    onReceipt: receipt => {
      if (isBrowser) {
        window.localStorage.uniswapExchangeTemplate = receipt.contractAddress
      }
    }
  })
}

export default uniswapDeployExchangeTemplate
