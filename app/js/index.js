import artifact from '/build/contracts/ToDo.json'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
/*import config from '/app/js/config'*/
console.log('loaded')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));

// const TruffleContract = require("truffle-contract")



const abstraction = new TruffleContract(artifact);

abstraction.setProvider(web3.currentProvider);
const network = Object.keys(artifact.networks)[0];
const address = artifact.networks[network].address;

abstraction.at(address)
.then((todo) => {
    todo.getTaskIds()
    .then((taskIds) => {
      console.log(taskIds)
    })
})

web3.eth.getAccounts(console.log);
//dummy comment
