import { BrowserRouter as Router } from "react-router-dom";
import EachRoute from "./EachRoute";

const MainRouter = () => {
  return (
    <Router>
      <EachRoute />
    </Router>
  );
};

export default MainRouter;
