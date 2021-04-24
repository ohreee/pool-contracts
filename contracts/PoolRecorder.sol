// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./PoolFactory.sol";
import "./IPoolFactory.sol";

contract PoolRecorder {
    address[] poolList;
    event PoolAdded(address poolAddress);

    function createPool(
        string memory _name,
        string memory _description,
        bool _visible,
        address _owner
    ) public returns (address) {
        PoolFactory newPoolBank = new PoolFactory(_visible, _owner, _name, _description);
        poolList.push(address(newPoolBank));
        return address(newPoolBank);
    }

    function getListPools() public view returns (address[] memory) {
        return poolList;
    }

    function getPoolInfo(address poolAddress)
        public
        view
        returns (string memory, string memory, address,bool, uint)
    {
        IPoolFactory pool = IPoolFactory(poolAddress);
        return pool.getPoolInfo();
    }
}
