import MainRouter from './routes/MainRouter';
import { ProductProvider } from './context/ProductContext';
import './App.css';

function App() {
  return (
    <>
      <ProductProvider>
          <MainRouter />
      </ProductProvider>
    </>
  );
}

export default App;