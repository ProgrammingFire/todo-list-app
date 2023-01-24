import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import Task from './interfaces/Task';


function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [todo, setTodo] = useState<String>("")
  const [task, setTask] = useState<String>("")

  useEffect(() => {
    const tasksString = localStorage.getItem("tasks");
    if (tasksString !== null) {
      const tasksObj = JSON.parse(tasksString)
      setTasks(tasksObj)
    }
  }, [])

  function addTask(): void {
    setTasks([...tasks, {
      name: task,
      todos: []
    }])
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }

  function addTodo(e: FormEvent, task: Task, index: number): void {
    e.preventDefault()
    console.log(tasks)
    const newTasks = [...tasks]
    newTasks[index].todos = [...newTasks[index].todos, {
      todo,
      isDone: false
    }]

    setTasks(newTasks)
    localStorage.setItem("tasks", JSON.stringify(tasks))

  }

  function handleTodoDoneChange(isDone: boolean, todoIndex: number, taskIndex: number): void {
    console.log(tasks)
    const newTasks = [...tasks]
    newTasks[taskIndex].todos[todoIndex].isDone = isDone

    setTasks(newTasks)
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }

  return (
    <div className="accent-indigo-600 dark flex min-h-screen w-full flex-col items-center justify-center gap-8 overflow-hidden bg-gray-900 text-white selection:bg-indigo-900 selection:text-white">
      <h1 className="mt-14 text-4xl font-bold">To-Do List App</h1>
      <div className="flex w-full flex-col items-center gap-3 lg:w-2/5 lg:flex-row">
        <input type="text" className="w-3/5 appearance-none rounded-lg bg-gray-800 py-1 px-5 text-center shadow-xl focus:border-none focus:outline-none focus:ring-4 focus:ring-indigo-200 lg:w-3/4" placeholder="Add a Task" onChange={(e) => setTask(e.target.value)} />
        <button className="w-3/5 appearance-none rounded-lg bg-indigo-800 py-1 px-5 text-center shadow-xl focus:border-none focus:outline-none focus:ring-4 focus:ring-gray-200 lg:w-auto" onClick={() => addTask()}>Add</button>
      </div>
      <div>
        {tasks.map((task, index) => (
          <div className="flex w-full flex-col items-center gap-3 mb-14">
            <h1 className="text-4xl font-bold">{task.name}</h1>
            <form onSubmit={(e) => addTodo(e, task, index)} className="flex w-full flex-col items-center gap-3 lg:w-2/5 lg:flex-row">
              <input name={index.toString()} type="text" onChange={(e) => setTodo(e.target.value)} className="w-3/5 appearance-none rounded-lg bg-gray-800 py-1 px-5 text-center shadow-xl focus:border-none focus:outline-none focus:ring-4 focus:ring-indigo-200 lg:w-3/4" placeholder={`Add a To-do to ${task.name}`} />
              <button type='submit' className="w-3/5 appearance-none rounded-lg bg-indigo-800 py-1 px-5 text-center shadow-xl focus:border-none focus:outline-none focus:ring-4 focus:ring-gray-200 lg:w-auto">Add</button>
            </form>

            <div className="flex w-screen items-center justify-center">
              <ul className="w-3/5 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                {task.todos.map((curTodo, todoIndex) => (
                  <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                    <div className="flex items-center pl-3">
                      <input id={todoIndex.toString()} defaultChecked={curTodo.isDone} onChange={() => handleTodoDoneChange(!curTodo.isDone, todoIndex, index)} type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700" />
                      <label htmlFor={todoIndex.toString()} className={`ml-2 w-full py-3 text-sm font-medium text-gray-900 ${curTodo.isDone ? 'line-through' : ''} dark:text-gray-300`}>{curTodo.todo}</label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
