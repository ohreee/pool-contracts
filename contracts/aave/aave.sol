// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IaToken {
    function balanceOf(address _user) external view returns (uint256);

    function redeem(uint256 _amount) external;
}

interface IAaveLendingPool {
    function deposit(
        address _reserve,
        uint256 _amount,
        uint16 _referralCode
    ) external;
}

contract Aave {
    struct Token {
        mapping(address => uint256) DepositedToken;
        mapping(address => bool) Allowed;
    }
    mapping(address => Token) userBalance;

    modifier approveBeforeDeposit(
        address erc20_token,
        address aaveLendingPool
    ) {
        if (userBalance[msg.sender].Allowed[erc20_token] == false) {
            IERC20 ierc20_token = IERC20(erc20_token);
            ierc20_token.approve(address(aaveLendingPool), type(uint256).max);
            userBalance[msg.sender].Allowed[erc20_token] = true;
        }
        _;
    }

    function depositToken(
        uint256 amount,
        address _erc20_token,
        address _aaveLendingPool
    ) public approveBeforeDeposit(_erc20_token, _aaveLendingPool) {
        IERC20 erc20_token = IERC20(_erc20_token);
        IAaveLendingPool aaveLendingPool = IAaveLendingPool(_aaveLendingPool);
        userBalance[msg.sender].DepositedToken[_erc20_token] += amount;
        require(
            erc20_token.transferFrom(msg.sender, address(this), amount),
            "DAI Transfer failed!"
        );
        aaveLendingPool.deposit(address(erc20_token), amount, 0);
    }

    function withdrawToken(uint256 _amountInDai) external {
        require(userDepositedDai[msg.sender] >= _amountInDai, "You cannot withdraw more than deposited!");

        aToken.redeem(_amountInDai);
        require(dai.transferFrom(address(this), msg.sender, _amountInDai), "DAI Transfer failed!");
        
        userDepositedDai[msg.sender] = userDepositedDai[msg.sender] - _amountInDai;
    }
}
