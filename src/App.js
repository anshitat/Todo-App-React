import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Form.js';
import Todolist from "./Todolist";

function App() {
  //state
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setfilteredTodos]  = useState([])
  
  // run once when the app starts
  useEffect(()=>{
    getLocalTodos()
  }, []);

   //use effect
   useEffect( () =>{
      filterHandler();
      saveLocalTodos();
    }, [todos, status]);


  //funtions
  const filterHandler = () =>{
    switch(status){
      case 'completed':
        setfilteredTodos( todos.filter( todo => todo.completed === true))
        break;
      case 'uncompleted':
        setfilteredTodos( todos.filter( todo => todo.completed === false))
        break;
      default:
        setfilteredTodos(todos);
        break;
    }
  }

  //save to local
  const saveLocalTodos = () =>{
    if(localStorage.getItem('todo' === null)){
      localStorage.setItem('todos', JSON.stringify([]))
    }else{
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }
    //get todos
    const getLocalTodos = () =>{
      if(localStorage.getItem('todo' === null)){
        localStorage.setItem('todos', JSON.stringify([]))
      }else{
        let todoLocal = JSON.parse(localStorage.getItem('todos'));
        setTodos(todoLocal);
      }
    }

  return (
    <div className="App">
     <header>
       <h1>Anshita's Todo List</h1>
     </header>
     <Form 
      inputText={inputText} 
      todos={todos} 
      setTodos={setTodos} 
      setInputText={setInputText}
      setStatus = {setStatus}
      />
     <Todolist 
        filteredTodos = {filteredTodos}
        setTodos = {setTodos}
         todos={todos}/>
    </div>
  );
}

export default App;
