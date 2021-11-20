import './App.css';
import NavbarComponent from './components/NavbarComponent';
import TaskContextProvider from './contexts/TaskContext';

function App(): JSX.Element {
  return (
    <TaskContextProvider>
      <NavbarComponent></NavbarComponent>
    </TaskContextProvider>
  );
}

export default App;
