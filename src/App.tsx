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
                      <div
                        className="flex flex-col"
                        style={{
                          height: "calc(100vh - 60px)",
                          overflow: "hidden",
                        }}
                      >
                        <TopBar />
                        <div className="flex w-full flex-grow">
                          <div className="">
                            <Sidebar />
                          </div>
                          <div className="w-10/12 overflow-auto">{element}</div>
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
