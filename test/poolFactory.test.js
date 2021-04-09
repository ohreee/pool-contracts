const { accounts, contract } = require('@openzeppelin/test-environment');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const { assert } = require('chai');

const PoolFactory = contract.fromArtifact('PoolFactory'); // Loads a compiled contract
const ether = 10 ** 18; // 1 ether = 1000000000000000000 wei
const wei = 1;
const initialDepositsBalance = 1 * ether;
const [chairperson, alice, bob, eddine, aslan, emily, farah, gina, harry, irina] = accounts;

describe("PoolFactory", () => {

  it("enroll everyone", async () => {
    pool = await PoolFactory.new(false, chairperson, { from: chairperson });
    // var chairpersonBalanceWallet = await this.web3.eth.getBalance(chairperson);
    assert.isTrue(await pool.is_owner({ from: chairperson }))

    await pool.enroll(alice, { from: chairperson });
    const aliceBalance = await pool.balance({ from: alice });
    assert.equal(aliceBalance.toNumber(), 0, "initial balance is incorrect");

    await pool.enroll(bob, { from: chairperson });
    const bobBalance = await pool.balance({ from: bob });
    assert.equal(bobBalance, 0, "initial balance is incorrect");

    await pool.enroll(eddine, { from: chairperson });
    const eddineBalance = await pool.balance({ from: eddine });
    assert.equal(eddineBalance, 0, "initial balance is incorrect");

    await pool.enroll(aslan, { from: chairperson });
    const aslanBalance = await pool.balance({ from: aslan });
    assert.equal(aslanBalance, 0, "initial balance is incorrect");
  });

  it("should deposit correct amount", async () => {
    pool = await PoolFactory.new(false, chairperson, { from: chairperson });
    const deposit = 1.5 * ether;
    await pool.enroll(alice, { from: chairperson });
    const receipt = await pool.deposit({ from: alice, value: Web3.utils.toBN(deposit) });

    const balance = await pool.balance({ from: alice });
    assert.equal(balance, deposit,
      "deposit amount incorrect, check deposit method");
    const depositsBalance = await pool.depositsBalance();
    assert.equal(depositsBalance, deposit,
      "pool deposits balance should be increased");

    const expectedEventResult = { accountAddress: alice, amount: deposit };
    assert.equal(receipt.logs[0].args.accountAddress, expectedEventResult.accountAddress,
      "LogDepositMade event accountAddress property not emitted");
    assert.equal(receipt.logs[0].args.amount, expectedEventResult.amount,
      "LogDepositMade event amount property not emitted");
  });

  it("should not deposit if not enrolled", async () => {
    pool = await PoolFactory.new(false, chairperson, { from: chairperson });
    const deposit = 1.5 * ether;

    try {
      await pool.deposit({ from: arnaud, value: Web3.utils.toBN(deposit) });
    } catch (e) {
      assert(e, "Error: VM Exception while processing transaction: revert");
    }

  });

  it("should withdraw correct amount", async () => {
    pool = await PoolFactory.new(false, chairperson, { from: chairperson });
    const deposit = 5 * ether;

    await pool.enroll(alice, { from: chairperson });
    const receipt = await pool.deposit({ from: alice, value: Web3.utils.toBN(deposit) });
    const balance = await pool.balance({ from: alice });
    assert.equal(balance, deposit,
      "deposit amount incorrect, check deposit method");

    await pool.withdraw(Web3.utils.toBN(deposit), { from: alice });

    const new_balance = await pool.balance({ from: alice });
    assert.equal(new_balance, 0, "withdraw amount incorrect");
  });

  it("should keep balance unchanged if withdraw greater than balance", async () => {
    pool = await PoolFactory.new(false, chairperson, { from: chairperson });
    const deposit = 3 * ether;

    await pool.enroll(alice, { from: chairperson });
    await pool.deposit({ from: alice, value: Web3.utils.toBN(deposit) });
    try {
      await pool.withdraw(Web3.utils.toBN(deposit + 1 * ether), { from: alice });
    } catch (e) {
      assert(e, "Error: VM Exception while processing transaction: revert");
    }

    const balance = await pool.balance({ from: alice });
    assert.equal(balance, deposit, "balance should be kept intact");
  });

  it("should revert ether sent to this contract through fallback", async () => {
    pool = await PoolFactory.new(false, chairperson, { from: chairperson });
    const deposit = 3 * ether;

    const first_balance = await web3.eth.getBalance(alice);

    try {
      await pool.deposit({ from: alice, value: Web3.utils.toBN(deposit) });
    } catch (e) {
      assert(e, "Error: VM Exception while processing transaction: revert");
    }

    const second_balance = await web3.eth.getBalance(alice);
    assert.approximately(parseFloat(Web3.utils.fromWei(first_balance)), parseFloat(Web3.utils.fromWei(second_balance)), 1.0, "Alice balance should be kept intact");

  });

  it("should allow depost if pool is public", async () => {
    pool = await PoolFactory.new(true, chairperson, { from: chairperson });
    const deposit = 3 * ether;
    await pool.deposit({ from: alice, value: Web3.utils.toBN(deposit) });
    await pool.deposit({ from: bob, value: Web3.utils.toBN(deposit) });

    const AliceBalancePool = await pool.balance({ from: alice });
    const BobBalancePool = await pool.balance({ from: bob });
    assert.equal(Web3.utils.fromWei(AliceBalancePool), Web3.utils.fromWei(BobBalancePool))
    assert.equal(Web3.utils.fromWei(AliceBalancePool), 3)

    const getParticipantList = await pool.getParticipantList()
    assert.equal(getParticipantList.length, 3)
    assert.include(getParticipantList, chairperson)
    assert.include(getParticipantList, alice)
    assert.include(getParticipantList, bob)

  });
});
