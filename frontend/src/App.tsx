import './App.css';
import NavbarComponent from './modules/tasks/components/NavbarComponent';
import TaskContextProvider from './shared/contexts/TaskContext';

function App() {
  return (
    <TaskContextProvider>
      <NavbarComponent></NavbarComponent>
    </TaskContextProvider>
  );
}

export default App;
