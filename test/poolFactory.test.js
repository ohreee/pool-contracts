const { accounts, contract } = require('@openzeppelin/test-environment');
const { expectRevert, balance } = require('@openzeppelin/test-helpers');
const Web3 = require('web3');
const { assert } = require('chai');

const PoolFactory = contract.fromArtifact('PoolFactory'); // Loads a compiled contract
const ether = 10 ** 18; // 1 ether = 1000000000000000000 wei
const wei = 1;
const [chairperson, alice, bob, charlie, danny] = accounts;

describe("PoolFactory", () => {

  it("enroll everyone", async () => {
    pool = await PoolFactory.new(false, chairperson, "title", "description", { from: chairperson });
    assert.isTrue(await pool.is_owner({ from: chairperson }))

    await pool.enroll(alice, { from: chairperson });
    const aliceBalance = await pool.balance({ from: alice });
    assert.equal(aliceBalance.toNumber(), 0, "initial balance is incorrect");

    await pool.enroll(bob, { from: chairperson });
    const bobBalance = await pool.balance({ from: bob });
    assert.equal(bobBalance, 0, "initial balance is incorrect");

    await pool.enroll(charlie, { from: chairperson });
    const charlieBalance = await pool.balance({ from: charlie });
    assert.equal(charlieBalance, 0, "initial balance is incorrect");

    await pool.enroll(danny, { from: chairperson });
    const dannyBalance = await pool.balance({ from: danny });
    assert.equal(dannyBalance, 0, "initial balance is incorrect");

    const poolInfo = await pool.getPoolInfo({from: chairperson});
    assert.equal(poolInfo[0], "title")
    assert.equal(poolInfo[1], "description")
    assert.equal(poolInfo[2], chairperson)
    assert.equal(poolInfo[3], false)
    assert.equal(poolInfo[4].toNumber(), 5)
    
  });

  it("should deposit correct amount", async () => {
    pool = await PoolFactory.new(false, chairperson, "0x"+"title", "description", { from: chairperson });
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
    pool = await PoolFactory.new(false, chairperson, "0x"+"title", "description", { from: chairperson });
    const deposit = 1.5 * ether;

    await expectRevert(
      pool.deposit({ from: alice, value: Web3.utils.toBN(deposit) }),
      "Not allowed"
    );
  });

  it("should withdraw correct amount", async () => {
    pool = await PoolFactory.new(false, chairperson, "0x"+"title", "description", { from: chairperson });
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
    pool = await PoolFactory.new(false, chairperson, "0x"+"title", "description", { from: chairperson });
    const deposit = 3 * ether;

    await pool.enroll(alice, { from: chairperson });
    await pool.deposit({ from: alice, value: Web3.utils.toBN(deposit) });
    await expectRevert(
      pool.withdraw(Web3.utils.toBN(deposit + 1 * ether), { from: alice }),
      "Error amount, can't withdraw more than deposit"
    );

    const balance = await pool.balance({ from: alice });
    assert.equal(balance, deposit, "balance should be kept intact");
  });

  it("should revert ether sent to this contract through fallback", async () => {
    pool = await PoolFactory.new(false, chairperson, "0x"+"title", "description", { from: chairperson });
    const deposit = 3 * ether;

    const first_balance = await balance.current(alice);

    await expectRevert(
      pool.deposit({ from: alice, value: Web3.utils.toBN(deposit) }),
      "Not allowed"
    );

    const second_balance = await balance.current(alice);
    assert.approximately(parseFloat(Web3.utils.fromWei(first_balance)), parseFloat(Web3.utils.fromWei(second_balance)), 1.0, "Alice balance should be kept intact");

  });

  it("should allow depost if pool is public", async () => {
    pool = await PoolFactory.new(true, chairperson, "title", "description", { from: chairperson });
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
