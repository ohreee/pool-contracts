const { assert } = require('chai');
var Web3 = require('web3');

var SimpleBank = artifacts.require("./SimpleBank.sol");

const ether = 10 ** 18; // 1 ether = 1000000000000000000 wei
const wei = 1;
const initialDepositsBalance = 1 * ether;

contract("SimpleBank - basic initialization", function (accounts) {
  const chairperson = accounts[0];
  const alice = accounts[1];
  const bob = accounts[2];
  const eddine = accounts[3];
  const aslan = accounts[4];

  it("enroll everyone", async () => {
    const bank = await SimpleBank.deployed({ from: chairperson});
    var chairpersonBalanceWallet = await this.web3.eth.getBalance(chairperson);
    // var gasPrice = await this.web3.eth.getGasPrice();
    // assert.equal(chairpersonBalanceWallet, Web3.utils.toWei("99", "ether") - bank.gas * gasPrice);

    await bank.enroll(alice, { from: chairperson });
    const aliceBalance = await bank.balance({ from: alice });
    assert.equal(aliceBalance.toNumber(), 0, "initial balance is incorrect");

    await bank.enroll(bob, { from: chairperson });
    const bobBalance = await bank.balance({ from: bob });
    assert.equal(bobBalance, 0, "initial balance is incorrect");

    await bank.enroll(eddine, { from: chairperson });
    const eddineBalance = await bank.balance({ from: eddine });
    assert.equal(eddineBalance, 0, "initial balance is incorrect");

    await bank.enroll(aslan, { from: chairperson });
    const aslanBalance = await bank.balance({ from: aslan });
    assert.equal(aslanBalance, 0, "initial balance is incorrect");

    // const depositsBalance = await bank.depositsBalance();
    // assert.equal(depositsBalance.toNumber(), initialDepositsBalance, "initial balance is incorrect");
  });

  it("should deposit correct amount", async () => {
    const bank = await SimpleBank.deployed({ from: chairperson});
    const deposit = 1.5 * ether;

    const receipt = await bank.deposit({ from: alice, value: web3.utils.toBN(deposit) });

    const balance = await bank.balance({ from: alice });
    assert.equal(balance, deposit,
      "deposit amount incorrect, check deposit method");
    //   const depositsBalance = await bank.depositsBalance();
    //   assert.equal(depositsBalance, initialDepositsBalance + deposit,
    //     "bank deposits balance should be increased");

    const expectedEventResult = { accountAddress: alice, amount: deposit };
    assert.equal(receipt.logs[0].args.accountAddress, expectedEventResult.accountAddress,
      "LogDepositMade event accountAddress property not emitted");
    assert.equal(receipt.logs[0].args.amount, expectedEventResult.amount,
      "LogDepositMade event amount property not emitted");
  });
});
