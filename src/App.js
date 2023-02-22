import Header from './commponents/Header';
import Tasks from './commponents/Tasks';
import AddTask from './commponents/AddTask';
import Footer from './commponents/Footer';
import About from './commponents/About';

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	const [showAddTask, setShowAddTask] = useState(false);
	const [tasks, setTasks] = useState([]);
	useEffect(() => {
		const getTasks = async () => {
			const serverTasks = await fetchTasks();
			setTasks(serverTasks);
		};

		getTasks();
	}, []);

	//fetch tasks
	const fetchTasks = async () => {
		const res = await fetch('http://localhost:5000/tasks');
		const data = await res.json();

		return data;
	};

	//fetch task
	const fetchTask = async (id) => {
		const res = await fetch(`http://localhost:5000/tasks/${id}`);
		const data = await res.json();

		return data;
	};

	//Add Task
	const addTask = async (task) => {
		const res = await fetch('http://localhost:5000/tasks', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(task),
		});

		const data = await res.json();
		setTasks([...tasks, data]);
	};

	//Delete a Task
	const deleteTask = async (id) => {
		await fetch(`http://localhost:5000/tasks/${id}`, {
			method: 'DELETE',
		});

		setTasks(tasks.filter((task) => task.id !== id));
	};
	//Toggle Reminder
	const ToggleReminder = async (id) => {
		const taskToToggle = await fetchTask(id);
		const updtask = { ...taskToToggle, reminder: !taskToToggle.reminder };
		const res = await fetch(`http://localhost:5000/tasks/${id}`, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(updtask),
		});
		const data = await res.json();

		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, reminder: data.reminder } : task
			)
		);
	};
	return (
		<Router>
			<div className="container">
				<Header
					onAdd={() => setShowAddTask(!showAddTask)}
					showAdd={showAddTask}
				/>
				<Routes>
					<Route
						path="/"
						exact
						element={
							<>
								{showAddTask && <AddTask onAdd={addTask} />}
								{tasks.length > 0 ? (
									<Tasks
										tasks={tasks}
										onDelete={deleteTask}
										onToggle={ToggleReminder}
									/>
								) : (
									'No Tasks To Show'
								)}
							</>
						}
					/>
					<Route path="/about" element={<About />} />
				</Routes>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
