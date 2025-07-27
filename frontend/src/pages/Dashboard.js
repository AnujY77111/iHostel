
import Header from '../componenets/Header'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
    // if (loading) return <p>Loading…</p>;
  if (!user) {
    return <p>Please log in to access the dashboard.</p>;
  }

  return (
    <div>
        <Header/>
      <h1>Welcome, {user.user.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
export default Dashboard
