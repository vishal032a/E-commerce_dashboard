import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav'
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <h1 className='banner'> E-Commerce Dashboard</h1>
      <BrowserRouter>
        <Nav />
      </BrowserRouter>

      <Footer/>
    </div>
  );
}

export default App;
