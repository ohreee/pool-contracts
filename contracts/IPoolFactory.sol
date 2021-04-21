// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

interface PoolFactory{
    function enroll(address participant) external returns (uint256);
    function deposit() external payable returns (uint256);
    function deposit_and_invest_compound(address payable _cEtherContract) external payable returns (uint256);
    function withdraw(uint256 withdrawAmount) external payable returns (uint256 remainingBal);
    function withdraw_and_redeem(uint256 withdrawAmount, bool redeemType,address _cEtherContract) external returns (uint256 remainingBal);
    function balance() external returns (uint256);
    function depositsBalance() external returns (uint256);
    function is_owner() external returns (bool);
    function get_owner() external returns (address);
    function is_public() external returns(bool);
    function balanceParticipant(address participant) external returns (uint256);
    function is_allowed(address participant) external returns (bool);
    function getParticipantList() external returns (address[] memory);
}
