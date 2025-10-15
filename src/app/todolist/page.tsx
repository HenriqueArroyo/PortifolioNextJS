"use client";
// Diz ao Next.js que este componente será executado no navegador (cliente),
// pois ele usa estados e interações (não pode ser apenas renderizado no servidor).

import { useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Todolist.module.css";
// Importa o hook useState do React, usado para criar e atualizar variáveis reativas (estados).

export default function Home() {
  interface Task {
    id: string;
  titulo: string;
  concluida: boolean;
  }



  // Cria um estado "tasks" que é um array de strings, e uma função "setTasks" para atualizá-lo.
  const [tasks, setTasks] = useState<Task[]>([]);

  // Cria um estado "newTask" para guardar o texto que o usuário digita no input.
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;

    const novaTarefa: Task = {
      id: crypto.randomUUID(),
      titulo: newTask,
      concluida: false,
    };

    setTasks([...tasks, novaTarefa]);
    setNewTask("");
  };

  // Função que remove uma tarefa com base no índice dela na lista.
  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Concluir tarefa
  const toggleConcluir = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, concluida: !task.concluida } : task
      )
    );
  };

  return (
    <main className={styles.menu}>
      <h1 className="text-3xl font-bold mb-4">To-Do List</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded w-64"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          // Atualiza o estado "newTask" conforme o usuário digita.
          placeholder="Digite uma nova tarefa"
          // Texto de dica dentro do campo.
        />

        <button className={styles.adicionar} onClick={addTask}
        // Ao clicar, executa a função addTask() para adicionar a nova tarefa.
        >
          Adicionar
        </button>
      </div>

      <ul className="w-64">
        {tasks.map((task) => (
          // Percorre cada item do array "tasks" e cria um <li> para cada um.
          <li
            key={task.id}
            // "key" ajuda o React a identificar cada item da lista de forma única.
            className={`flex justify-between items-center bg-gray-100 p-2 rounded mb-2 ${
              task.concluida ? "bg-green-100" : "bg-gray-100"
            }`}>

              <span className={`flex-1 ${task.concluida ? "line-through text-gray-500" : ""}`}>
                {task.titulo}
              </span>
            
            <button className={styles.concluir} onClick={() => toggleConcluir(task.id)}>
              {task.concluida ? "Desfazer" : "Concluir"}
            </button>

            <button className={styles.remover} onClick={() => removeTask(task.id)}>
            X
            </button>



          </li>
        ))}
      </ul>
    </main>
  );
}
