import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EntryPage from "./components/EntryPage";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import AdminPanel from "./components/AdminPanel";
import ModifyStudent from "./components/ModifyStudent";
import CreateStudent from "./components/CreateStudent";
import { useState } from "react";
import RefreshHandler from "./RefreshHandler";
import AttendanceHistory from "./components/AttendanceHistory";

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <BrowserRouter>
      {" "}
      <RefreshHandler setisAuthenticated={setisAuthenticated} />
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/admin" element={<AdminPanel />}></Route>
        <Route path="/create" element={<CreateStudent />}></Route>
        <Route path="/modify" element={<ModifyStudent />}></Route>
        <Route path="/history" element={<AttendanceHistory />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
