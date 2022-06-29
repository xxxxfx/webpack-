import React , {Suspense, lazy} from 'react';
// import Home from './pages/Home/index';
// import About from './pages/About/index';
import { Link, Routes, Route } from 'react-router-dom';
const Home = lazy(() => import("./pages/Home/index"));
const About = lazy(() => import("./pages/About/index"));
function App() {
  return <div>
    <h1>App</h1>
    <ul>
      <li>
      <Link to="/home"> Home</Link>
      </li>
      <li>
      <Link to="/about"> about</Link>
      </li>
    </ul>
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </Suspense>
    
  </div>
}
export default App;