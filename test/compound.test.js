const { accounts, contract, web3 } = require('@openzeppelin/test-environment');
const Web3 = require('web3')
const { expectRevert, balance } = require('@openzeppelin/test-helpers');
const { assert } = require('chai');
const ceth_abi = require("../build/contracts/ceth_abi.json")
const ganache = require("ganache-core");
web3.setProvider(ganache.provider({"fork": "https://mainnet.infura.io/v3/7306a29750d54ed0b1272f3fba553dc2", "ws":false, "debug": true}));

const ether = 10 ** 18; // 1 ether = 1000000000000000000 wei
const cether_address = "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5"
const [chairperson, alice, bob, charlie, danny] = accounts;

const CethContract = contract.fromABI(ceth_abi, "0x", cether_address)
const PoolFactory = contract.fromArtifact('PoolFactory'); // Loads a compiled contract

describe("Compound", () => {
  it("test deposit_and_invest_compound()", async () => {

    pool = await PoolFactory.new(true, chairperson)
    console.log(CethContract.methods, pool.address, CethContract.balanceOf.call)
    //exit()

    // deposit
    await pool.deposit_and_invest_compound(cether_address, {from: chairperson, value: web3.utils.toBN(2, "ether")});
    await pool.deposit_and_invest_compound(cether_address, {from: alice, value: web3.utils.toBN(5, "ether")});
    // check balances
    assert.equal((await pool.balance({from: chairperson})).toNumber(), 2)
    assert.equal((await pool.balance({from: alice})).toNumber(), 5)
    assert.equal((await pool.depositsBalance()).toNumber(), 7)
    //check ceth balance
    // result = CethContract.balanceOf(pool.address, {from: chairperson})
    console.log((await CethContract.balanceOf(pool.address, {from: chairperson})).toString())
    console.log((await CethContract.balanceOf(chairperson, {from: chairperson})).toString())
    // console.log(await CethContract.symbol())
    // console.log((await CethContract.methods.balanceOf(chairperson)).toString())
    // console.log((await CethContract.balanceOf(alice).call(alice, {from: alice})).toString())
    console.log((await CethContract.exchangeRateCurrent.call({from: chairperson})).toString())
  });
});
