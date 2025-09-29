import { RouterProvider } from "react-router/dom";
import "./App.css";
import route from "./route/route";
import { AuthProvider } from "./context/AuthProvider";
import ModalLogin from "./component/modalLogin";
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
