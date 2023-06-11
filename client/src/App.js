import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Feed from "./components/Feed/Feed";
import Notifications from "./components/Notifications/Notifications";
import Favourites from "./components/Favourites/Favourites";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="h-auto bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Feed" element={<Feed />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/Favourites" element={<Favourites />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
