import { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import WelcomeScreen from "./pages/WelcomeScreen";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import { myContextApi } from "./StateManager";

function App() {
  // const style = {
  //   backgroundImage: `url('background.png')`,

  //   backgroundPosition: "center",
  //   backgroundSize: "cover",
  // };
  const { doingsUsers, isUser } = useContext(myContextApi);

  return (
    <div className="bg-[url('background.png')] bg-cover h-screen w-full relative md:m-auto overflow-scroll">
      <Routes>
        <Route index element={<WelcomeScreen />} />
        <Route path="registration" element={<Registration />} />
        <Route path="login" element={<Login />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute user={isUser}>
              <Dashboard />{" "}
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
