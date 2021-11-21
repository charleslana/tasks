import './App.css';
import Routes from './shared/routes/';
import TaskContextProvider from './modules/tasks/contexts/TaskContext';

function App(): JSX.Element {
  return (
    <TaskContextProvider>
      <Routes />
    </TaskContextProvider>
  );
}

export default App;
