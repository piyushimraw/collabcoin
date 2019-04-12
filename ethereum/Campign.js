import web3 from './web3';
import Campign from './dist/Campign.abi';

export default address => new web3.eth.Contract(Campign, address);
