import { RouterProvider } from "react-router/dom";
import "./App.css";
import route from "./route/route";
import { AuthProvider } from "./context/AuthProvider";
function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={route}></RouterProvider>
      </AuthProvider>
    </>
  );
}

export default App;
