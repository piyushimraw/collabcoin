export default [
  {
    constant: false,
    inputs: [
      {
        name: 'reqId',
        type: 'uint256'
      }
    ],
    name: 'approveRequest',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'contribute',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'desc',
        type: 'string'
      },
      {
        name: 'val',
        type: 'uint256'
      },
      {
        name: 'ben',
        type: 'address'
      }
    ],
    name: 'createRequest',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        name: 'value',
        type: 'uint256'
      },
      {
        name: 'sender',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    constant: true,
    inputs: [],
    name: 'contributorCount',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'id',
        type: 'uint256'
      },
      {
        name: 'contributor',
        type: 'address'
      }
    ],
    name: 'getRequest',
    outputs: [
      {
        name: '_desc',
        type: 'string'
      },
      {
        name: '_val',
        type: 'uint256'
      },
      {
        name: '_beneficary',
        type: 'address'
      },
      {
        name: '_contribCount',
        type: 'uint256'
      },
      {
        name: 'isCompleted',
        type: 'bool'
      },
      {
        name: 'hasApporved',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'isContributed',
    outputs: [
      {
        name: '_isContributed',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'manager',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'minimumVal',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'requestCount',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
];
