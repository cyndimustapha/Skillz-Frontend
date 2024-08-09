import 'bootstrap/dist/css/bootstrap.min.css';

const LearnersDashboard = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '20%', backgroundColor: '#28a745', color: '#fff', padding: '20px' }}>
        <h2 style={{ color: '#ffffff' }}>SKILLZ</h2>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link text-white" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/dashboard">Dashboard</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Chats</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Notifications</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Browse</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Settings</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Help</a>
          </li>
        </ul>
      </div>
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#f8f9fa' }}>
        <h2>Dashboard</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ flex: '1 1 calc(33.333% - 20px)', backgroundColor: '#ffffff', padding: '10px', borderRadius: '5px' }}>
            <img src="https://via.placeholder.com/150" alt="Cooking For Beginners" style={{ width: '100%', borderRadius: '5px' }} />
            <h4>Cooking For Beginners</h4>
            <p>Bill Kiprop</p>
          </div>
          <div style={{ flex: '1 1 calc(33.333% - 20px)', backgroundColor: '#ffffff', padding: '10px', borderRadius: '5px' }}>
            <img src="https://via.placeholder.com/150" alt="Painting Landscapes" style={{ width: '100%', borderRadius: '5px' }} />
            <h4>Painting Landscapes</h4>
            <p>Bill Kiprop</p>
          </div>
          <div style={{ flex: '1 1 calc(33.333% - 20px)', backgroundColor: '#ffffff', padding: '10px', borderRadius: '5px' }}>
            <img src="https://via.placeholder.com/150" alt="Fighting Back" style={{ width: '100%', borderRadius: '5px' }} />
            <h4>Fighting Back</h4>
            <p>Bill Kiprop</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnersDashboard;
