import './App.css';
import SideNav from './Components/SideNav/SideNav';
import TopNav from './Components/TopNav/TopNav';

function App() {
  return (
    <div className="App">
      <SideNav />
      <div className="Main">
        <TopNav />
      </div>
    </div>
  );
}

export default App;
