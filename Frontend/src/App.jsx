import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./components/AuthContextProvider";
import AppRouter from "./AppRouter";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
