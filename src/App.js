import { Routes, Route, Router } from "react-router-dom";
import Signuppage from "./pages/signuppage";
import Loginpage from "./pages/loginpage";
import Homepage from "./pages/homepage";
import Addproduct from "./pages/addproduct";
import Editproduct from "./pages/editproduct";
import Viewproduct from "./pages/viewproduct";
import Productshow from "./pages/productshow";
import axios from "axios";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  return (
    // <div className="App">
    //   <Loginpage />
    // </div>
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/" element={<Loginpage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/viewproduct" element={<Viewproduct />} />
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/editproduct/:id" element={<Editproduct />} />
        <Route path="/productshow/:id" element={<Productshow />} />
      </Routes>
    </div>
  );
}

export default App;
