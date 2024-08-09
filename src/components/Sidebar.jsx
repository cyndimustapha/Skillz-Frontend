// components/Sidebar.js
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Optional: for styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/signin">Sign In</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/paymentpage">Payment Page</Link></li> 
      </ul>
    </div>
  );
};

export default Sidebar;
