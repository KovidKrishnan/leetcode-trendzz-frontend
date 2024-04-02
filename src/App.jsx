import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import UsernameInput from "./components/UsernameInput";
import DashBoard from "./components/DashBoard";
function App() {
  return (
      <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<UsernameInput />}
          />
          <Route
            path="/dashboard"
            element={<DashBoard/>}
          />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
