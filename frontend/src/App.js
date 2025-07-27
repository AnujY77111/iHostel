import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './componenets/PrivateRoute';

function App() {
  const router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>,
  },
  {
    path:"/api/users/login",
    element:<Login/>
  },
  {
    path:"/api/users/signup",
    element:<Signup/>
  },
  {
    path:"/dashboard",
    element:(
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    )
    ,
    
  },
  
]);

  return (
    <div className="App">
      <RouterProvider router={router}/>
     
    </div>
  );
}

export default App;
