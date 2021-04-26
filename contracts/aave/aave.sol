// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IaToken {
    function balanceOf(address _user) external view returns (uint256);
    function redeem(uint256 _amount) external;
}


interface IAaveLendingPool {
    function deposit(address _reserve, uint256 _amount, uint16 _referralCode) external;
}

contract Aave {
    mapping(address => uint256) userDepositedToken;
    mapping(address => bool) tokenAllowed; 

    modifier approveBeforeDeposit(address erc20_token, address aaveLendingPool) {
        if(tokenAllowed[msg.sender] == false) {
            IERC20 ierc20_token = IERC20(erc20_token);
            ierc20_token.approve(address(aaveLendingPool), type(uint256).max);
            tokenAllowed[msg.sender] = true;
        }
        _;
    }

    function depositToken(uint amount, address _erc20_token, address _aaveLendingPool) public approveBeforeDeposit(_erc20_token, _aaveLendingPool) {
        IERC20 erc20_token = IERC20(_erc20_token);
        IAaveLendingPool aaveLendingPool = IAaveLendingPool(_aaveLendingPool);
        userDepositedToken[msg.sender] += amount;
        require(erc20_token.transferFrom(msg.sender, address(this), amount), "DAI Transfer failed!");
        aaveLendingPool.deposit(address(erc20_token), amount, 0);
    }
    
}