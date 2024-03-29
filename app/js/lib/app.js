import $ from 'jquery'
import artifact from '/build/contracts/ToDo.json'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
/*import config from '/app/js/config'*/
import {renderTasks} from "./render"
import {getAccount, getTasks } from "./actions"
class App { 
constructor(/*config*/) { 
    //this.config = config; 
}

setup() { 
    //const { ethereumUrl } = this.config; 
    const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

    const Todo = new TruffleContract(artifact);
    Todo.setProvider(web3.currentProvider);

    const network = Object.keys(artifact.networks)[0];
    const address = artifact.networks[network].address;

    this.web3 = web3;
    this.address = address;
    this.Todo = Todo;
    this.$tasks = $('#tasks');
    this.$newTask = $('#new-task');
    this.$taskContent = $('#task-content'); 
    this.$taskAuthor = $('#task-author');

    return new Promise((resolve, reject) => {
        getAccount(this.web3)
        .then((account) => {
            this.account = account;
            return Todo.at(address);
        })
        .then((todo) => {
            this.todo = todo;
            resolve(todo);
        })
        .catch((error) => {
            reject(error);
        })
    });
}

getAndRenderTasks() {
    getTasks(this.todo)
      .then((tasks) => renderTasks(this.$tasks, tasks));
  }

  init() {
    this.$newTask.on('submit', (event) => {
      event.preventDefault();

      this.todo.createTask(
        this.$taskContent.val(),
        this.$taskAuthor.val(),
        { from: this.account, gas: 1000000 }
      ).then(() => {
        this.$taskContent.val('')
        this.$taskAuthor.val('')
        this.getAndRenderTasks()
      })
    });

    this.$tasks.on('click', (event) => {
      if($(event.target).is('input')) {
        const id = event.target.id.split('-')
        this.todo.toggleDone(id, { from: this.account, gas: 1000000 })
          .then(() => this.getAndRenderTasks());
      }
    })

    this.getAndRenderTasks();
} 
}

export default App;