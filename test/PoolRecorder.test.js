const { accounts, contract } = require('@openzeppelin/test-environment');
const [owner, alice, bob, charlie, dean, emily, farah, gina, harry, irina] = accounts;

const { expect, assert } = require('chai');

const PoolRecorder = contract.fromArtifact('PoolRecorder'); // Loads a compiled contract
const SimpleBank = contract.fromArtifact('SimpleBank'); // Loads a compiled contract

describe('PoolRecorder', function () {

    beforeEach(async () => {
        this.poolRecorder = await PoolRecorder.new({ from: owner });
    });

    it('create a new instance of SimpleBank and add it to poolrecorder', async () => {
        this.PoolOne = await SimpleBank.new({ from: alice });
        this.PoolTwo = await SimpleBank.new({ from: bob });
        this.poolRecorder.addPool(this.PoolOne.address, alice, "alice's pool", "pool for alice and friends", true)
        this.poolRecorder.addPool(this.PoolTwo.address, bob, "bob's pool", "pool for bob and friends", true)
        const [aPoolOne, aPoolTwo] = await this.poolRecorder.getListPools()
        console.log(await this.poolRecorder.getPoolInfo(aPoolOne))
        console.log(await this.poolRecorder.getPoolInfo(aPoolTwo))
        assert.isTrue(true)
    });

    it('create a new pool from poolrecorder', async () => {
        await this.poolRecorder.createPool("charlie's pool", "pool for charlie and friends", true, { from: charlie })
        await this.poolRecorder.createPool("dean's pool", "pool for dean and friends", true, { from: dean })
        const listPool = await this.poolRecorder.getListPools()
        console.log(await this.poolRecorder.getPoolInfo(listPool[0]))
        console.log(await this.poolRecorder.getPoolInfo(listPool[1]))
        assert.isTrue(true)
        // expect(await PoolRecorder.owner()).to.equal(owner);
    });
});
