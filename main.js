var Web3 = require('web3');
const fs = require('fs');
const web3 = new Web3("http://localhost:9545")

let rawdata = fs.readFileSync('build/contracts/SimpleBank.json');
let simple_bank_abi = JSON.parse(rawdata);

const ether = 10 ** 18;
const wei = 1;
const initialDepositsBalance = 15 * ether;
simple_bank_address = "0x1b9F1C0Dda842151De212b5f9296588361C674B9"
const SimpleBank = new web3.eth.Contract([simple_bank_abi], simple_bank_address)

async function main() {
    let accounts = await web3.eth.getAccounts();
    const chairperson = accounts[0];
    const alice = accounts[1];

    const tx = SimpleBank.methods.enroll(alice);
    const gas = await tx.estimateGas({ from: alice });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(address);

    const signedTx = await web3.eth.accounts.signTransaction(
        {
            to: simple_bank_address,
            data,
            gas,
            gasPrice,
            nonce
        },
        "d698aa087c2f57993ec8dd0e25788583360eebea2b0d0aad27d648ed1bad75ca"
    );
    // console.log(`Old data value: ${await myContract.methods.data().call()}`);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    // console.log(`Transaction hash: ${receipt.transactionHash}`);
    // console.log(`New data value: ${await myContract.methods.data().call()}`);

    // const createTransaction = await web3.eth.accounts.signTransaction(
    //     {
    //         from: chairperson,
    //         gas: 100000
    //     },
    //     "5362df8541ca60a07aa771ac0e194332498ca08ae5df53c15a820488a5409eb2"
    // );

    // await SimpleBank.methods.enroll(alice).send();
    // await SimpleBank.deposit({ from: alice, value: web3.utils.toBN(deposit) });

}

main()
