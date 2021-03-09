const { accounts, contract } = require('@openzeppelin/test-environment');
var Web3 = require('web3');
const { assert } = require('chai');

const PoolRecorder = contract.fromArtifact('PoolRecorder'); // Loads a compiled contract
const SimpleBank = contract.fromArtifact('SimpleBank'); // Loads a compiled contract

const [owner, alice, bob, charlie, dean, emily, farah, gina, harry, irina] = accounts;

describe('PoolRecorder', function () {

    beforeEach(async () => {
        this.poolRecorder = await PoolRecorder.new({ from: owner });
    });

    it('should create new pools from PoolRecorder smarcontract', async () => {
        addressAlicePool = await this.poolRecorder.createPool("alice's pool", "pool for alice and friends", true, { from: alice })
        addressMyDefiPool = await this.poolRecorder.createPool("MyDefi's pool", "MyDefi is a new defi project that have a great impact", true, { from: charlie })
        const listPool = await this.poolRecorder.getListPools()
        assert.equal(listPool.length, 2)
        getPoolInfoAlice = await this.poolRecorder.getPoolInfo(listPool[0])
        assert.equal(getPoolInfoAlice.name, "alice\'s pool")
        assert.equal(getPoolInfoAlice.description, "pool for alice and friends")
        assert.equal(getPoolInfoAlice.visible, true)
        assert.equal(getPoolInfoAlice.owner, alice)
    });

    it('should remove a pool from PoolRecorder smarcontract', async () => {
        addressAlicePool = await this.poolRecorder.createPool("alice's pool", "pool for alice and friends", true, { from: alice })
        // addressMyDefiPool = await this.poolRecorder.createPool("MyDefi's pool", "MyDefi is a new defi project that have a great impact", true, { from: charlie })
        const listPool = await this.poolRecorder.getListPools()
        assert.equal(listPool.length, 1)
        getPoolInfoAlice = await this.poolRecorder.getPoolInfo(listPool[0])
        assert.equal(getPoolInfoAlice.name, "alice\'s pool")
        assert.equal(getPoolInfoAlice.description, "pool for alice and friends")
        assert.equal(getPoolInfoAlice.visible, true)
        assert.equal(getPoolInfoAlice.owner, alice)
    });

    it('should remove a pool from PoolRecorder smarcontract', async () => {
        addressAlicePool = await this.poolRecorder.createPool("alice's pool", "pool for alice and friends", true, { from: alice })
        addressMyDefiPool = await this.poolRecorder.createPool("MyDefi's pool", "MyDefi is a new defi project that have a great impact", true, { from: charlie })
        const listPool = await this.poolRecorder.getListPools()
        assert.equal(listPool.length, 2)
        await this.poolRecorder.removePool(listPool[0])
        listPoolNew = await this.poolRecorder.getListPools()
        // assert.equal(listPoolNew.length, 1)
        assert.equal(listPoolNew[0], listPool[1])
    });
});
