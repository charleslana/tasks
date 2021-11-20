import './App.css';
import AddTaskComponent from './modules/tasks/components/AddTaskComponent';
import NavbarComponent from './modules/tasks/components/NavbarComponent';
import TaskContextProvider from './shared/contexts/TaskContext';
import TasksListComponent from './modules/tasks/components/TasksListComponent';

function App(): JSX.Element {
  return (
    <TaskContextProvider>
      <NavbarComponent></NavbarComponent>
      <AddTaskComponent></AddTaskComponent>
      <TasksListComponent></TasksListComponent>
    </TaskContextProvider>
  );
}

export default App;
