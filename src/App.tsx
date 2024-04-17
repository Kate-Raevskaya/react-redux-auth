import React from 'react';
import './App.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {StartPage} from "./pages/startPage";
import {RegistrationPage} from "./pages/registrationPage";
import {LoginPage} from "./pages/loginPage";
import {Root} from "./pages/root";

function App() {
  const router = createBrowserRouter( [
    {
      path: '/',
      element: <Root />,
      children: [
          {index: true, element: <StartPage />},
        {
          path: 'login',
          element: <LoginPage/>,
        },
        {
          path: 'registration',
          element: <RegistrationPage />,
        },
      ]
    }
  ])

  return (
      <RouterProvider router={router} />
  );
}

export default App;
