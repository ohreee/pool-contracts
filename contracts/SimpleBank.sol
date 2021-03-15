// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract SimpleBank {
    bool private isPublic;
    address public owner;
    uint8 private participantCount;
    address[] public participantsList;
    mapping(address => uint256) public balances;
    mapping(address => bool) public exists;

    // Log the event about a deposit being made by an address and its amount
    event LogDepositMade(address indexed accountAddress, uint256 amount);

    constructor(bool _isPublic) {
        /* Set the owner to the creator of this contract */
        isPublic = _isPublic;
        owner = msg.sender;
        balances[owner] = 0;
        exists[owner] = true;
        participantCount = 0;
        participantsList.push(owner);
    }

    /// @notice Enroll a customer with the bank,
    /// Only the owner can enroll a participant
    /// @return The balance of the user after enrolling
    function enroll(address participant) public returns (uint256) {
        require(msg.sender == owner && isPublic == false);
        require(exists[participant] == false);
        participantCount++;
        participantsList.push(participant);
        balances[participant] = 0;
        exists[participant] = true;
        return balances[participant];
    }

    /// @notice Deposit ether into bank, requires method is "payable"
    /// @return The balance of the user after the deposit is made
    function deposit() public payable returns (uint256) {
        require(exists[msg.sender] == true || isPublic == true);
        if (is_allowed(msg.sender) == false) {
            participantCount++;
            participantsList.push(msg.sender);
            balances[msg.sender] = 0;
            exists[msg.sender] = true;
        }
        balances[msg.sender] += msg.value;
        emit LogDepositMade(msg.sender, msg.value);
        return balances[msg.sender];
    }

    /// notice Withdraw ether from bank
    /// return The balance remaining for the user
    function withdraw(uint256 withdrawAmount)
        public
        returns (uint256 remainingBal)
    {
        require(exists[msg.sender] == true);
        // Check enough balance available, otherwise just return balance
        if (withdrawAmount <= balances[msg.sender]) {
            balances[msg.sender] -= withdrawAmount;
            payable(msg.sender).transfer(withdrawAmount);
        }
        return balances[msg.sender];
    }

    /// @notice Just reads balance of the account requesting, so "constant"
    /// @return The balance of the user
    function balance() public view returns (uint256) {
        return balances[msg.sender];
    }

    /// @return The balance of the Simple Bank contract
    function depositsBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function is_owner() public view returns (bool) {
        return owner == msg.sender;
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

    function invest_compound() public pure returns(uint) {
        return 0;
    }
}
