import { Route, Routes } from "react-router-dom";
import SearchBox from "../components/Home/SearchBox";
import ProductPage from "../components/ProductPage/Product";

const EachRoute = () => {
    return (
      <Routes>
        <Route
          path="/"
          element={
              <SearchBox />
          }
        />

        <Route
          path="/search-results"
          element={
              <ProductPage />
          }
        />
      </Routes>
    )
}

export default EachRoute