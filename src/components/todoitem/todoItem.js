import { useState, useEffect } from "react";
import { fetchTodos, deleteTodo, updateTodo, createTodo } from '../../services/todoService';
import TodoList from '../todolist/todolist';
import TodoModal from '../modal/todoModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./todoitem.css"

// Add a loading spinner component
function LoadingSpinner() {
    return (
        <div className="loading-spinner">
            <div className="spinner"></div>
        </div>
    );
}

function TodoItem() {
    const [todos, setTodos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);
    const [updatedDetails, setUpdatedDetails] = useState({ title: '', description: '', date: new Date() });
    const [isCreating, setIsCreating] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    useEffect(() => {
        async function loadTodos() {
            try {
                const todos = await fetchTodos();
                setTodos(todos);
            } catch (error) {
                console.error('Failed to fetch todos:', error);
            }
        }
        loadTodos();
    }, []);

    const handleUpdateClick = (todo) => {
        setCurrentTodo(todo);
        setUpdatedDetails({ 
            title: todo.title, 
            description: todo.description, 
            date: new Date(todo.date).toISOString().slice(0, 10) // Format date
        });
        setIsEditing(true);
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdatedDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };

    const handleUpdateSubmit = async () => {
        setIsLoading(true); // Start loading
        let response;
        try {
            response = await updateTodo(currentTodo._id, updatedDetails);
            setIsEditing(false);
            if (response.ok){
                setTodos(prevTodos => prevTodos.map(todo =>
                    todo._id === currentTodo._id ? { ...todo, ...updatedDetails } : todo
                ));
                toast.success('Item UPDATED successfully!');
            }
            setCurrentTodo(null);
        } catch (error) {
            toast.error('Failed to UPDATE todo');
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    const handleCreateClick = () => {
        setUpdatedDetails({ 
            title: '', 
            description: '', 
            date: new Date().toISOString().slice(0, 10) // Format date
        });
        setIsCreating(true);
    };

    const handleCreateSubmit = async () => {
        setIsLoading(true); // Start loading
        try {
            const newTodo = await createTodo(updatedDetails);
            console.log(newTodo)
            if (newTodo.ok){
                setTodos(prevTodos => [...prevTodos, updatedDetails]);
                toast.success('Todo Created successfully!');
            } else {
                toast.error('Failed to create todo');
            }
            setIsCreating(false);
        } catch (error) {
            alert('Failed to create todo:', error);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    const handleDeleteClick = async (todoId) => {
        setIsLoading(true); // Start loading
        let response;
        try {
            response = await deleteTodo(todoId);
            if (response.ok){
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId));
                toast.success('Todo deleted successfully!');
            }
        } catch (error) {
            toast.error('Failed to delete todo:', error);
        } finally {
            setIsLoading(false); // Stop loading
            return response
        }
    };

    return (
        <div className="todo-item-container">
            {isLoading && <LoadingSpinner />} {/* Conditionally render loading spinner */}
            <div className={`content ${isLoading ? 'loading' : ''}`}> {/* Apply dark background */}
                <div className="left-side">
                    <button className="add-button-item" onClick={handleCreateClick}>+ Add Item</button>
                </div>
                <div className="center-list">
                    <TodoList todos={todos} setTodos={setTodos} onUpdateClick={handleUpdateClick} onDelete={handleDeleteClick} />
                    {isEditing && (
                        <TodoModal
                            title="Update Todo"
                            updatedDetails={updatedDetails}
                            onChange={handleUpdateChange}
                            onSubmit={handleUpdateSubmit}
                            onDelete={handleDeleteClick} 
                            onCancel={() => setIsEditing(false)}
                        />
                    )}
                    {isCreating && (
                        <TodoModal
                        title="Create Todo"
                            updatedDetails={updatedDetails}
                            onChange={handleUpdateChange}
                            onSubmit={handleCreateSubmit}
                            onDelete={handleDeleteClick} 
                            onCancel={() => setIsCreating(false)}
                        />
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default TodoItem;
