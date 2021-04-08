import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if (!newTaskTitle) {
      alert("Adicione um título na sua task");
    } else {
      var randomized = Math.ceil(Math.random() * Math.pow(10, 5)); //Cria um número aleatório do tamanho definido em size.
      var digito = Math.ceil(Math.log(randomized)); //Cria o dígito verificador inicial
      while (digito > 10) {
        //Pega o digito inicial e vai refinando até ele ficar menor que dez
        digito = Math.ceil(Math.log(digito));
      }
      var randomId = String(randomized) + String(digito);

      const task: Task = {
        id: parseInt(randomId),
        title: newTaskTitle,
        isComplete: false,
      };

			//Funciona, porém a versao corrigida é melhor
      /* let tasksList = tasks;
      tasksList.push(task);
      setTasks(tasksList); */

			//Corrigido: usando setState em forma de callback para atualizar valor
			//apos renderizacao
			setTasks(oldState => [...oldState, task])
      setNewTaskTitle("");
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
		const alteredTasks = tasks.map(task => task.id === id ? {
			...task,
			isComplete: !task.isComplete
		} : task);

		setTasks(alteredTasks)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    let filteredTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(filteredTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo To-Do"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
