import './App.css';
import Routes from './shared/routes/';
import TaskContextProvider from './shared/contexts/TaskContext';

function App(): JSX.Element {
  return (
    <TaskContextProvider>
      <Routes />
    </TaskContextProvider>
  );
}

export default App;
