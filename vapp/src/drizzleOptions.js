// import SimpleBank from '../../build/contracts/SimpleBank.json'
import PoolRecorder from '../../build/contracts/PoolRecorder.json'

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [PoolRecorder],
  events: {
    SimpleBank: ['LogDepositMade']
  },
  polls: {
    //check the blockchain every 5s
    accounts: 1000,
    blocks: 1000
  }
}

export default options
