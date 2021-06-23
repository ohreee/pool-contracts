// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

interface IPoolFactory{
    function enroll(address participant) external returns (uint256);
    function deposit() external payable returns (uint256);
    function deposit_and_invest_compound(address payable _cEtherContract) external payable returns (uint256);
    function withdraw(uint256 withdrawAmount) external payable returns (uint256 remainingBal);
    function withdraw_and_redeem(uint256 withdrawAmount, bool redeemType,address _cEtherContract) external returns (uint256 remainingBal);
    function balance() external view returns (uint256);
    function depositsBalance() external view returns (uint256);
    function is_owner() external view returns (bool);
    function get_owner() external view returns (address);
    function is_public() external view returns(bool);
    function balanceParticipant(address participant) external view returns (uint256);
    function is_allowed(address participant) external view returns (bool);
    function getParticipantList() external view returns (address[] memory);
    function getPoolInfo() external view returns(string memory, string memory, address, bool, uint);
}
