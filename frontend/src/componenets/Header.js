import React, { useContext } from 'react'
import { NavLink } from 'react-router'
import "./Header.css"
import { AuthContext } from '../contexts/AuthContext';
const Header = () => {
   const { user, logout } = useContext(AuthContext);
//    const handleLogout = () => {
//   logout();
//   navigate("/");
// };
  return (
    <div className="TopBox">
      <h1>iHostel</h1>
      <ul>
        <li>
            <NavLink to="/">Home</NavLink>

        </li>
        
          
           <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
           
                
        
        
          
          <li>
            <NavLink to="/api/users/login">Login</NavLink>
        </li>
        <li>
            <NavLink to="/api/users/signup">Signup</NavLink>
        </li>
          
        
        
       
      </ul>
    </div>
  )
}

export default Header
