import AboutPage from '../../modules/about/pages/AboutPage';
import NavbarComponent from '../../modules/tasks/components/NavbarComponent';
import NotFoundComponent from '../components/NotFoundComponent';
import React from 'react';
import TaskDetailsPage from '../../modules/tasks/pages/TaskDetailsPage';
import TaskPage from '../../modules/tasks/pages/TaskPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function index(): JSX.Element {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path='/' element={<TaskPage />} />
        <Route path='/task/:id' element={<TaskDetailsPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='*' element={<NotFoundComponent />} />
      </Routes>
    </Router>
  );
}

export default index;
