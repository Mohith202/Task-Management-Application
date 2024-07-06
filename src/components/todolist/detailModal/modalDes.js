import "./modalDes.css"

export default function ModalDescription({ selectedTodo, closeModal, handleDelete, handleUpdateClick }) {
    return(
        <div className="modal-item">
        <div className="modal-content-item">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <div className="todo-detail-header">
                <p className="todo-date">{selectedTodo.date}</p>
                <h1 className="todo-title">{selectedTodo.title}</h1>
            </div>
            <p className="todo-description">{selectedTodo.description}</p>
            <div className="todo-detail-buttons">
                <button className="delete-button" onClick={() => handleDelete(selectedTodo._id)}>Delete</button>
                <button className="update-button" onClick={() => handleUpdateClick(selectedTodo)}>Update</button>
            </div>
        </div>
    </div>
    )
}