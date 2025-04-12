import ROUTES from "./routes";
import Home from "../pages/home/Home";
import PredictionPage from "../pages/prediction/PredictionPage";
import Dashboard from "../pages/dashboard/Dashboard";
import ConsultationPage from "../pages/consultation/ConsultationPage";
import Chats from "../pages/chat/Chats";
import SingleChat from "../pages/chat/SingleChat";

export const privateRoutes = [
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.PREDICT, element: <PredictionPage /> },
  { path: ROUTES.CHATS, element: <Chats /> },
  { path: ROUTES.SINGLECHAT, element: <SingleChat /> },
  { path: ROUTES.DASHBOARD, element: <Dashboard /> },
  { path: ROUTES.CONSULTATION, element: <ConsultationPage /> },
  { path: ROUTES.DOCTORS, element: <Dashboard /> },

  { path: ROUTES.DASHBOARD, element: <Dashboard /> },

];
