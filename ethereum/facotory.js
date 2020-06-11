import web3 from './web3';
import CampignFactory from './dist/CampignFactory.abi';
import Address from './dist/CampignFactory';

const instance = web3.eth.contract(CampignFactory, Address);
export default instance;
