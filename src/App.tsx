import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useUserStore } from "./stores/tokenStore"; // Assuming you have this store for user profile
import { privateRoutes } from "./routes/privateRoutes"; // Define your private routes
import { publicRoutes } from "./routes/publicRoutes"; // Define your public routes
import TopBar from "./components/common/layouts/TopBar";
import Sidebar from "./components/common/layouts/Sidebar";

function App() {
  const { userProfile } = useUserStore();

  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={<>{element}</>} />
      ))}

      {/* Private Routes */}
      <Route
        path="*"
        element={
          userProfile?.token ? (
            <Routes>
              {privateRoutes.map(({ path, element }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <>
                      <div className="h-screen flex flex-col">
                        <div className="sticky top-0 z-50  ">
                          <TopBar />
                        </div>
                        <div className="flex flex-1 overflow-hidden">
                          <div className="sticky top-0 h-full">
                            <Sidebar />
                          </div>
                          <div className="flex-1 overflow-y-auto py-4">
                            {element}
                          </div>
                        </div>
                      </div>
                    </>
                  }
                />
              ))}
            </Routes>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
