import "./modal.css";

function TodoModal({ title, updatedDetails, onChange, onSubmit, onCancel }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{title}</h2>
                <div className="modal-input">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        
                        value={updatedDetails.title}
                        onChange={onChange}
                        placeholder="Title"
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        rows="8"     cols="50"
                        value={updatedDetails.description}
                        onChange={onChange}
                        placeholder="Description"
                    />
                </div>
                <div className="modal-button">
                    {/* <input type="date" name="date" value={updatedDetails.date} onChange={onChange} /> */}
                    <button  className="update-button" onClick={onSubmit}>Submit</button>
                    <button className="delete-button" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default TodoModal;