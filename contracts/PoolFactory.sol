// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./compound/Compound.sol";

contract PoolFactory is Compound {
    bool public isPublic;
    address public owner;
    string public title;
    string public description;
    address[] public participantsList;
    mapping(address => uint256) public balances;
    mapping(address => bool) public exists;

    // Log the event about a deposit being made by an address and its amount
    event LogDepositMade(address indexed accountAddress, uint256 amount);

    constructor(
        bool _isPublic,
        address _owner,
        string memory _title,
        string memory _description
    ) {
        /* Set the owner to the creator of this contract */
        isPublic = _isPublic;
        owner = _owner;
        title = _title;
        description = _description;
        balances[owner] = 0;
        exists[owner] = true;
        participantsList.push(owner);
    }

    modifier onlyOwnerOrPublic() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier autoEnroll() {
        if (is_allowed(msg.sender) == false) {
            participantsList.push(msg.sender);
            balances[msg.sender] = 0;
            exists[msg.sender] = true;
        }
        _;
    }

    modifier onlyEnrolled() {
        require(exists[msg.sender] == true, "Not allowed");
        _;
    }

    modifier sufficentBalanceCheck(uint256 withdrawAmount) {
        require(
            withdrawAmount <= balances[msg.sender],
            "Error amount, can't withdraw more than deposit"
        );
        _;
    }

    /// @notice Enroll a customer with the bank,
    /// Only the owner can enroll a participant
    /// @return The balance of the user after enrolling
    function enroll(address participant) public onlyOwner returns (uint256) {
        require(exists[participant] == false, "Already enrolled");
        participantsList.push(participant);
        balances[participant] = 0;
        exists[participant] = true;
        return balances[participant];
    }

    /// @notice Deposit ether into bank, requires method is "payable"
    /// @return The balance of the user after the deposit is made
    function deposit()
        public
        payable
        onlyOwnerOrPublic
        autoEnroll
        returns (uint256)
    {
        balances[msg.sender] += msg.value;
        emit LogDepositMade(msg.sender, msg.value);
        return balances[msg.sender];
    }

    function deposit_and_invest_compound(address payable _cEtherContract)
        public
        payable
        onlyOwnerOrPublic
        autoEnroll
        returns (uint256)
    {
        balances[msg.sender] += msg.value;
        supplyEthToCompound(_cEtherContract);
        emit LogDepositMade(msg.sender, msg.value);
        return balances[msg.sender];
    }

    /// @notice Withdraw ether from bank
    /// @return remainingBal : the balance remaining for the user
    function withdraw(uint256 withdrawAmount)
        public
        onlyEnrolled
        sufficentBalanceCheck(withdrawAmount)
        returns (uint256 remainingBal)
    {
        balances[msg.sender] -= withdrawAmount;
        payable(msg.sender).transfer(withdrawAmount);
        return balances[msg.sender];
    }

    function withdraw_and_redeem(
        uint256 withdrawAmount,
        bool redeemType,
        address _cEtherContract
    )
        public
        onlyEnrolled
        sufficentBalanceCheck(withdrawAmount)
        returns (uint256 remainingBal)
    {
        // Check enough balance available, otherwise just return balance
        redeemCEth(withdrawAmount, redeemType, _cEtherContract);
        balances[msg.sender] -= withdrawAmount;
        payable(msg.sender).transfer(withdrawAmount);
        return balances[msg.sender];
    }

    /// @notice Just reads balance of the account requesting, so "constant"
    /// @return The balance of the user
    function balance() public view returns (uint256) {
        return balances[msg.sender];
    }

    /// @return The balance of the Pool contract
    function depositsBalance() public view returns (uint256) {
        if (participantsList.length == 0) {
            return 0;
        }
        uint256 res = 0;
        for (uint256 index = 0; index < participantsList.length; index++) {
            res += balances[participantsList[index]];
        }
        return res;
    }

    function is_owner() public view returns (bool) {
        return owner == msg.sender;
    }

    function get_owner() public view returns (address) {
        return owner;
    }

    function is_public() public view returns (bool) {
        return isPublic;
    }

    function balanceParticipant(address participant)
        public
        view
        returns (uint256)
    {
        return balances[participant];
    }

    function is_allowed(address participant) public view returns (bool) {
        return exists[participant] == true;
    }

    /// @return the participant list
    function getParticipantList() public view returns (address[] memory) {
        return participantsList;
    }

    function getPoolInfo()
        public
        view
        returns (
            string memory,
            string memory,
            address,
            bool,
            uint256
        )
    {
        return (title, description, owner, isPublic, participantsList.length);
    }
}
