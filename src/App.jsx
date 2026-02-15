import { useState ,useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { v4 as uuidv4 } from 'uuid';

import { FaBeer } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';



function App() {
  const [count, setCount] = useState(0);
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinish, setShowFinish] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  const savetoLS =  (params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  const toggleFinish = (e) => {
    setShowFinish(!showFinish)
  }
  
  
  const handleEdit = (e,id) => {
    let index = todos.filter(i=>i.id === id)
    setTodo(index[0].todo)
     let newTodos = todos.filter(item=>{
      return item.id !== id
    })
    setTodos(newTodos)
    savetoLS()
  }
  const handleDelete = (e,id) => {
    let newTodos = todos.filter(item=>{
      return item.id !== id
    })
    setTodos(newTodos)
    savetoLS()
  }
  const handleAdd = () => {
    setTodos([...todos, {id:uuidv4(), todo, isCompleted: false}])
    setTodo("")
    savetoLS()
  }
  
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    savetoLS()
  }
  return (
    <>
      <Navbar />
      <div className=" user bg-blue-200 container  my-3 max-w-4xl mx-auto  min-h-[80vh] rounded-xl ">
        <h2 className="font-bold text-2xl my-2 mx-6 py-2 font-serif">Add Todo</h2>
        <div className="add_todo m-4 flex justify-center ">
          <input type="text" onChange={handleChange} value={todo} placeholder="  Add new task" className="text-black w-1/2 user-btn rounded-xl h-9 border-b-amber-100 " />
          <button onClick={handleAdd} disabled={todo.length<=3} className="bg-blue-600 rounded-xl font-sans text-white p-2 mx-6 w-16 hover:cursor-pointer disabled:bg-violet-500 hover:bg-blue-950">Save</button>
        </div>
        <input type="checkbox" onChange={toggleFinish} className="mx-8"  checked={showFinish} id="show" /> Show Finish
        <label htmlFor=""></label>
        <h1 className="font-bold text-2xl mx-6 font-serif">Your Todo</h1>
        <div className="todos m-4 ">
          {todos.length === 0 && <div className="mx-5">No Todos to display</div> }
          {todos.map(item=>{
            return(showFinish || !item.isCompleted) && <div key={item.id} className="todo flex w-[50vw] justify-between my-3">
            <input name={item.id}  onChange={handleCheckbox} type="checkbox" checked={item.iscompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            <div className="button flex ">
              <button onClick={(e)=>{handleEdit(e,item.id)}} className=" bg-blue-600 text-2xl rounded-xl text-center text-white p-2 mx-4 w-12 hover:cursor-pointer hover:bg-blue-950  "><  FaEdit/> </button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className=" bg-blue-600 text-2xl rounded-xl text-white p-2 mx-1 w-12 hover:cursor-pointer hover:bg-blue-950"><MdDelete/></button>
            </div>
          </div>
        })}
      </div>
    </div>
    </>
  );
}

export default App;
