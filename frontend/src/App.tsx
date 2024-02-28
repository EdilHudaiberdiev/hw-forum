import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './Containers/Home/Home';
const App = () => {

  return (
    <>
      <header>
          <h1>Header</h1>
      </header>
      <main className="mt-5">
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </main>

    </>
  );
};

export default App;
