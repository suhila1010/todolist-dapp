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
  mapping(uint => Task) tasks;

  constructor(){
    lastTaskId = 0;
  }

  function createTask(string memory _content, string memory _author) public{
    tasks[lastTaskId] = Task(lastTaskId, block.timestamp, _content, _author, false);
    lastTaskId++;
  }

  function getTask(uint id) public view
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

  function getTasks() public view returns(Task[] memory){
    return tasks;
  }

}
