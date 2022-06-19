import $ from 'jquery'
import artifact from '/build/contracts/ToDo.json'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
/*import config from '/app/js/config'*/
import {renderTasks} from "./lib/render"

class App { 
  constructor(/*config*/) { 
    //this.config = config; 
  }

  setup() { 
    //const { ethereumUrl } = this.config; 
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));

    const Todo = new TruffleContract(artifact)
    Todo.setProvider(web3.currentProvider);

    const networks = Object.keys(artifact.networks);
    const address = artifact.networks[network].address;

    this.web3 = web3;
    this.address = address;
    this.Todo = Todo;
    this.$tasks = $('#tasks');

    return new Promise((resolve, reject) => {
      Todo.at(address)
      .then((todo) => {
         this.todo = todo;
         resolve(todo);
      })
      .catch((error) => {
        reject(error);
      });
    });   
  }

  init() { 
    return new Promise((resolve, reject) => { 
      this.todo.getTaskFixtures(0)
      .then((task) => { 
        renderTasks(this.$tasks, [task]);  
      }); 
    }); 
  } 
}

export default App;