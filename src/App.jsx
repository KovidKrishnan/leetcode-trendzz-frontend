import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import UsernameInput from "./components/UsernameInput";
import DashBoard from "./components/DashBoard";
function App() {
  return (
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

  );
}

export default App;
