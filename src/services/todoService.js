const API_URL = 'https://backendtodo-hfow.onrender.com'; // Replace with your actual backend URL

export async function fetchTodos() {
    const response = await fetch(`${API_URL}/todos`);
    if (!response.ok) {
        alert('Server Down. Please try again later');
    }
    return response.json();
}

export async function deleteTodo(id) {
    // console.log(`${API_URL}/todos/${id}`)
    const response = await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
    console.log(response)
    return response
}

export async function updateTodo(id, updatedTodo) {
    const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo)
    });
    return response
}

export async function createTodo(newTodo) {
    const response = await fetch(`${API_URL}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo)
    });
   
    return response

}