import web3 from './web3';
import Campign from './dist/Campign.abi';

export default (address) => web3.eth.contract(Campign, address);
