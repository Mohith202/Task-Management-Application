import { useState } from "react";
import "./todolist.css";
import ModalDescription from "./detailModal/modalDes";

function TodoList({ todos, setTodos, onDelete, onUpdateClick }) {
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

    const handleDelete = async (id, event) => {
        console.log(id)
        let response = await onDelete(id);
        console.log(response);
        if (response.ok) {
            console.log(response);
            setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
            setSelectedTodo(null); // Clear selected todo if it's deleted
        }
    };

    const handleTodoClick = (todo) => {
        setSelectedTodo(todo);
    };

    const closeModal = () => {
        setSelectedTodo(null);
        setIsUpdateModalVisible(false);
    };

    const handleUpdateClick = (todo) => {
        setSelectedTodo(todo);
        setIsUpdateModalVisible(true);
        onUpdateClick(todo);
    };

    return (
        <div className="todo-list">
            {todos.map((todo) => (
                <div key={todo._id} className="todo-single-item" onClick={() => handleTodoClick(todo)}>
                    <div className="title-date">
                        <h1>{todo.title} <hr /></h1>
                        <p>{todo.date}</p>
                    </div>
                    {todo.description.length<=30?(
                        <p className="description-item">{todo.description}</p>
                    ):(
                        <p className="description-item">{todo.description.substring(0, 30)}...</p>
                    )}
                    <div className="todo-single-item-button">
                        <button className="delete-button" onClick={(event) => handleDelete(todo._id, event)}>Delete</button>
                        <button className="update-button" onClick={() => handleUpdateClick(todo)}>Update</button>
                    </div>
                </div>
            ))}

            {selectedTodo && !isUpdateModalVisible && (
                <ModalDescription
                    selectedTodo={selectedTodo}
                    closeModal={closeModal}
                    handleDelete={() => handleDelete(selectedTodo._id)}
                    handleUpdateClick={() => handleUpdateClick(selectedTodo)}
                />
            )}
        </div>
    );
}

export default TodoList;