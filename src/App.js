import Navbar from './components/Navbar';
import TodoItem from './components/todoitem/todoItem';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
        <TodoItem></TodoItem>
    </div>
  );
}

export default App;
