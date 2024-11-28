import logo from './logo.svg';
import './App.css';
import { AuthorizationForm } from './Components/authorizationForm/authorizationForm';
import { RegisterForm } from './Components/registerForm/registerForm';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {  AdminPanel } from './Components/adminPanel/adminPanel';


const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthorizationForm />,
    // element: <AdminPanel/>
  },
  {
    path: '/register',
    element: <RegisterForm />,
  },
  {
    path: '/adminPanel',
    element: <AdminPanel />,
  },
])





function App() {

  return (
    <RouterProvider router ={router}/>
  );
}

export default App;
