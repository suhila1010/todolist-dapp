/*import $ from 'jQuery'
import artifact from '/build/contracts/ToDo.json'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
//import config from '/app/js/config'
import {renderTasks} from "./lib/render"
$(() => {
console.log('loaded')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
const abstraction = new TruffleContract(artifact);

abstraction.setProvider(web3.currentProvider);
const network = Object.keys(artifact.networks)[0];
const address = artifact.networks[network].address;

abstraction.at(address)
.then((todo) => {
    return todo.getTaskFixtures()
    })
    .then((task) => {
        renderTasks($('#tasks'), [task])
    })
})

//web3.eth.getAccounts(console.log);
//dummy comment*/

import $ from 'jquery';  
import App from './lib/app';

$(() => { 
  const app = new App(); 
  app.setup()
  .then(() => { 
    return app.init(); 
  }) 
  .then(() => { 
    console.log('ETB ToDo List Dapp loaded!!'); 
  }) 
  .catch((error) => {
    console.error(`Ooops... something went wrong: ${error}`);
  });
});

