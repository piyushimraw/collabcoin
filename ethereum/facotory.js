import web3 from './web3';
import CampignFactory from './dist/CampignFactory.abi';
import Address from './dist/CampignFactory';

const instance = new web3.eth.Contract(CampignFactory, Address);
export default instance;
