var Web3 = require('web3');
var Contract = require('web3-eth-contract');
const fs = require('fs');
const web3 = new Web3("http://localhost:9545")

let rawdata = fs.readFileSync('build/contracts/SimpleBank.json');
let simple_bank_abi = JSON.parse(rawdata);
console.log()

const ether = 10 ** 18;
const wei = 1;
const initialDepositsBalance = 15 * ether;

async function main() {
    simple_bank_address = "0xCC663FBe6Ba8409F8fD676c61945cc158Cc311a5"
    chairman_key = "0xa1fe98ac230a75831e7d380165e82fe7d2fcd653832c2763af096dd39470fdb5"
    const SimpleBank = new web3.eth.Contract(simple_bank_abi["abi"], simple_bank_address)

    let accounts = await web3.eth.getAccounts();
    const chairperson = accounts[0];
    const alice = accounts[1];

    const tx = SimpleBank.methods.enroll(alice);
    // var gas = await tx.estimateGas({ from: alice });
    const gasPrice = await web3.eth.getGasPrice();
    const abi_encoded = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(chairperson);
    console.log("none", nonce)
    data =  {
        from: chairperson,
        to: simple_bank_address,
        data: abi_encoded,
        gas: web3.utils.toHex("420000"),
        // gas,
        gasPrice : gasPrice,
        nonce
    }
    const signedTx = await web3.eth.accounts.signTransaction(
       data,
        chairman_key
    );
    const receipt = web3.eth.sendSignedTransaction(signedTx.rawTransaction);
}

main()
