import React from "react";
import "./App.css";
import { RouterProvider } from "react-router";
import router from "./routes/route";
import { AuthProvider } from "./context/AuthProvider";
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
