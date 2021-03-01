import SimpleStorage from './contracts/SimpleBank.json'

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [SimpleStorage],
  events: {
    SimpleBank: ['LogDepositMade']
  },
  polls: {
    //check the blockchain every 5s
    accounts: 5000
  }
}

export default options
