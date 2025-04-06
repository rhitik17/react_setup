import ROUTES from "./routes";
import Home from "../pages/home/Home";
import PredictionPage from "../pages/prediction/PredictionPage";
import Dashboard from "../pages/dashboard/Dashboard";
import ConsultationPage from "../pages/consultation/ConsultationPage";

export const privateRoutes = [
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.PREDICT, element: <PredictionPage /> },
  { path: ROUTES.DASHBOARD, element: <Dashboard /> },
  { path: ROUTES.CONSULTATION, element: <ConsultationPage /> },
];
