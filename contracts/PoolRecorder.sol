// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./SimpleBank.sol";

contract PoolRecorder {
    struct Pool {
        string name;
        string description;
        address owner;
        address PoolAddress;
        bool visibility;
    }

    address[] poolList;
    mapping(address => Pool) public poolRecorded;

    event PoolAdded(address poolAddress);

    function createPool(
        string memory _name,
        string memory _description,
        bool _visible
    ) public {
        SimpleBank newPoolBank = new SimpleBank();
        addPool(address(newPoolBank), msg.sender, _name, _description, _visible);
    }

    function addPool(
        address poolAddress,
        address _owner,
        string memory _name,
        string memory _description,
        bool _visible
    ) public {
        poolList.push(poolAddress);
        poolRecorded[poolAddress] = Pool(
            _name,
            _description,
            _owner,
            poolAddress,
            _visible
        );
        emit PoolAdded(poolAddress);
    }

    function removePool(address poolAddress) public {
        for (uint256 index = 0; index < poolList.length; index++) {
            if (poolList[index] == poolAddress) {
                poolList[index] = poolList[poolList.length - 1];
                delete poolList[poolList.length - 1];
                break;
            }
        }
    }

    function getListPools() public view returns (address[] memory) {
        return poolList;
    }

    function getPoolInfo(address poolAddress)
        public
        view
        returns (Pool memory)
    {
        return poolRecorded[poolAddress];
    }
}
