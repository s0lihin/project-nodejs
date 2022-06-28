import { Navigate, Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import Fttd from "./pages/Fttd/Fttd";
import FttdSet from "./pages/FttdSet/FttdSet";
import BolakBalik from "./pages/BolakBalik/BolakBalik";
import History from "./pages/History/History";
import Result from "./pages/Result/Result";
import Home from "./pages/Home/Home";
import Quick2D from "./pages/Quick2D/Quick2D";
import ColokBebas from "./pages/ColokBebas/ColokBebas";
import ColokMacau from "./pages/ColokMacau/ColokMacau";
import ColokNaga from "./pages/ColokNaga/ColokNaga";
import Pinggiran from "./pages/Pinggiran/Pinggiran";
import NotFound from "./pages/NotFound/NotFound";

const AppRoutes = () => (
  <Routes>

    <Route path="/game" element={<ProtectedRoute />} >
      <Route path="/game" element={<Navigate replace to="/game/4d3d2d" />} />
      <Route path="/game/4d3d2d" element={<Fttd />} />
      <Route path="/game/4d3d2dset" element={<FttdSet />} />
      <Route path="/game/bolakbalik" element={<BolakBalik />} />
      <Route path="/game/quick2d" element={<Quick2D />} />
      <Route path="/game/colokbebas" element={<ColokBebas />} />
      <Route path="/game/colokmacau" element={<ColokMacau />} />
      <Route path="/game/coloknaga" element={<ColokNaga />} />
      <Route path="/game/pinggiran" element={<Pinggiran />} />
    </Route>

    <Route path="/history" element={<ProtectedRoute />} >
      <Route path="/history" element={<History />} />
    </Route>

    <Route path="/result" element={<ProtectedRoute />} >
      <Route path="/result" element={<Result />} />
    </Route>

    <Route path="/" element={<Home />} />

    <Route path='*' element={<NotFound />} />

  </Routes>
)

export default AppRoutes;