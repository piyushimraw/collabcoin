import Web3 from 'web3';
const provider = new Web3.providers.HttpProvider(
  'https://rinkeby.infura.io/v3/4fc2cf2f0b7a4e7bbd348dbd1feb8916'
);
let web3 = new Web3(provider, null, { transactionConfirmationBlocks: 1 });

if (typeof window !== 'undefined') {
  if (typeof window.ethereum !== 'undefined')
    web3 = new Web3(window.ethereum, null, {
      transactionConfirmationBlocks: 1
    });
}

export default web3;
