
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from './components/Navigation';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages";
import Login from "./pages/login";
import Memories from "./pages/memories";
import Children from "./pages/children";

function App() {
  return (
    <Router>
        <Navigation />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/memories"
                element={<Memories />}
            />
            <Route
                path="/children"
                element={<Children />}
            />
        </Routes>
    </Router>
  );
}

export default App
