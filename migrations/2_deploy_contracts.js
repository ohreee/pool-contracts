const ether = 10**18; // 1 ether = 1000000000000000000 wei
const wei = 1;
// var SimpleBank = artifacts.require("SimpleBank");
var PoolRecorder = artifacts.require("PoolRecorder");

module.exports = function(deployer) {
  // deployer.deploy(SimpleBank, false, 0x0);
  deployer.deploy(PoolRecorder);
};
