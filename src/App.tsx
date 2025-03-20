import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useTokenStore from "./stores/tokenStore";
// import SideBarLayout from "./components/layout/SideBarLayout";
import { privateRoutes } from "./routes/privateRoutes"; 
import { publicRoutes } from "./routes/publicRoutes";


function App() {
  const { token } = useTokenStore();

  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {/* Private Routes */}
        <Route
          path="/*"
          element={
            token ? (
              // <SideBarLayout>
                <Routes>
                  {privateRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                  ))}
                </Routes>
              // </SideBarLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
