const ether = 10**18; // 1 ether = 1000000000000000000 wei
const wei = 1;
// var PoolFactory = artifacts.require("PoolFactory");
var PoolRecorder = artifacts.require("PoolRecorder");

module.exports = function(deployer) {
  // deployer.deploy(PoolFactory, false, 0x0);
  deployer.deploy(PoolRecorder);
};
