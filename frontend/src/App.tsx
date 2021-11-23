import './App.css';
import LoaderContextProvider from './shared/contexts/LoaderContext';
import Routes from './shared/routes/';
import TaskContextProvider from './modules/tasks/contexts/TaskContext';

function App(): JSX.Element {
  return (
    <LoaderContextProvider>
      <TaskContextProvider>
        <Routes />
      </TaskContextProvider>
    </LoaderContextProvider>
  );
}

export default App;
