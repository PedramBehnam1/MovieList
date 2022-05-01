import Home from "../pages/home";
import Path from "./path";
import AddPage from "../pages/addPage";
import UpdatePage from "../pages/updatePage";
import MovieInformation from "../pages/moviInformationPage";
const Routes = [
 {
  Component: <Home />,
  path:Path.home,
 },

 {
  Component:<AddPage />,
  path:Path.addPage,
 },

 {
  Component:<UpdatePage />,
  path:Path.updatePage,
 },
 {
  Component:<MovieInformation />,
  path:Path.movieInformation,
 }

]

export default Routes;