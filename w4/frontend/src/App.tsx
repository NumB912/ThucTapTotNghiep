import React from "react";
import "./App.css";
import { RouterProvider } from "react-router";
import router from "./routes/route";
import { AuthProvider } from "./context/authProvider";
import { CalendarProvider } from "./context/calendarProvider";
function App() {
  return (
    <AuthProvider>
      <CalendarProvider>
        <RouterProvider router={router} />
      </CalendarProvider>
    </AuthProvider>
  );
}

export default App;
