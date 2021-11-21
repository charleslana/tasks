import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AboutPage from '../../modules/about/pages/AboutPage';
import NavbarComponent from '../../modules/tasks/components/NavbarComponent';
import NotFoundPage from '../pages/NotFoundPage';
import React from 'react';
import TaskPage from '../../modules/tasks/pages/TaskPage';

function index(): JSX.Element {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path='/' element={<TaskPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default index;