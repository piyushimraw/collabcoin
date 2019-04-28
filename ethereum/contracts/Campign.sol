pragma solidity >=0.4.22 <0.7.0;


contract Campign {
  struct Request {
    string description;
    uint value;
    address payable beneficiary;
    mapping(address => bool) approvers;
    uint approversCount;
    bool completed;
  }
  address public manager;
  uint public minimumVal;
  mapping(address => bool) contributors;
  uint public contributorCount;
  uint public requestCount;
  mapping(uint => Request) requests;

  constructor( uint value, address sender ) public {
    manager = sender;
    minimumVal = value;
  }

  function isContributed (address sender) public view returns(bool _isContributed){
    return contributors[sender];
  }

  function contribute () public payable {
    require(msg.value > minimumVal, 'Contribution should be greater that minimum value');
    if(isContributed(msg.sender) == false){
      contributors[msg.sender] = true;
      uint count = contributorCount;
      count = count + 1;
      contributorCount = count;
    }
  }

  function getRequest(uint id, address contributor) public view returns(string memory _desc, uint _val, address _beneficary, uint _contribCount, bool isCompleted, bool hasApporved) {
    Request storage tempRequest = requests[id];
    return (tempRequest.description,tempRequest.value, tempRequest.beneficiary, tempRequest.approversCount, tempRequest.completed, tempRequest.approvers[contributor]);
  }

  function createRequest(string memory desc, uint val, address payable ben) public {
    require(msg.sender == manager, "only manager can create a request");
    Request memory tempreq = Request(desc, val, ben, 0, false);
    uint newrequestCount = requestCount;
    newrequestCount = newrequestCount + 1;
    requestCount = newrequestCount;
    requests[requestCount] = tempreq;
  }

<<<<<<< HEAD
  modifier isContributor() {
    require(isContributed(msg.sender), "Not a Contributor");
    _;
  }

  modifier haveNotApproved(uint reqId) {
    require(requests[reqId].approvers[msg.sender] == false , "Already Approved");
    _;
  }
  // can approve only if approver is a contributor and has not
  // approved previously
  function approveRequest(uint reqId) public isContributor haveNotApproved(reqId) {
    requests[reqId].approvers[msg.sender] = true;
    requests[reqId].approversCount = requests[reqId].approversCount + 1;
  } 

}

=======
>>>>>>> 5a1526ba2f17a18e75848bbfd0ff2ee8f65a92bb

}
contract CampignFactory {
    Campign[] public campigns;

    function createNewCampign(uint value)public{
        Campign newCampign = new Campign(value, msg.sender);
        campigns.push(newCampign);
    }

    function getCampignCount () public view returns(uint) {
        return campigns.length;
    }
}
