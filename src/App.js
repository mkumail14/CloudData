import './App.css';

import Navbar from './myComponents/navbar.js';
import Footer from './myComponents/footer.js';
import Main from './myComponents/main.js';

function App() {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Main />
      </div>
      <Footer />
    </>
  );
}

export default App;
