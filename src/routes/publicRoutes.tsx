import ROUTES from "./routes";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import ForgotPassword from "../pages/authentication/ForgetPassoword";
import OtpVerify from "../pages/authentication/OtpVerify";
import Home from "../pages/home/Home";

export const publicRoutes = [
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.LOGIN, element: <Login /> },
  { path: ROUTES.SIGNUP, element: <Register /> },
  { path: ROUTES.FORGOTPASSWORD, element: <ForgotPassword /> },
  { path: ROUTES.OTPVERIFY, element: <OtpVerify /> },
];
