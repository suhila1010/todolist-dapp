// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract ToDo {
  struct Task{
    uint id;
    uint date;
    string content;
    string author;
    bool done;
  }
  uint lastTaskId;
  uint[] taskIds;
  mapping(uint => Task) tasks;

  event TaskCreated(uint id ,uint date, string content, string author,bool done);

  constructor(){
    lastTaskId = 0;
  }

  function createTask(string memory _content, string memory _author) public{
    lastTaskId++;
    tasks[lastTaskId] = Task(lastTaskId, block.timestamp, _content, _author, false);
    taskIds.push(lastTaskId);
    emit TaskCreated(lastTaskId, block.timestamp, _content, _author, false);
  }

  function getTaskIds() public view returns(uint[] memory){
    return taskIds;
  }

  function getTask(uint id) taskExisits(id) public view
  returns(
    uint,
    uint,
    string memory,
    string memory,
    bool
  ){
    
    return(
      id,
      tasks[id].date,
      tasks[id].content,
      tasks[id].author,
      tasks[id].done
    );
  }
  
  function getTaskFixtures() public view returns(
      uint,
      uint,
      string memory,
      string memory,
      bool
      ) {
    return (0, block.timestamp, "Create more tutorials for ETB", "Julien", false); 
  }

  modifier taskExisits(uint id){
    if(tasks[id].id == 0){
      revert();
    }
    _;
  }

}
