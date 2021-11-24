import AlertContextProvider from './shared/contexts/AlertContext';
import LoaderContextProvider from './shared/contexts/LoaderContext';
import Routes from './shared/routes/';
import TaskContextProvider from './modules/tasks/contexts/TaskContext';
import ToastContextProvider from './shared/contexts/ToastContext';
import './App.css';

function App(): JSX.Element {
  return (
    <LoaderContextProvider>
      <AlertContextProvider>
        <ToastContextProvider>
          <TaskContextProvider>
            <Routes />
          </TaskContextProvider>
        </ToastContextProvider>
      </AlertContextProvider>
    </LoaderContextProvider>
  );
}

export default App;
