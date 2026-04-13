import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import { LanguageProvider } from "./hooks/useLanguage.jsx";
import { CartProvider } from "./hooks/useCart.jsx";

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen bg-linen text-ink">
          <Header />
          <main>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Home />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/about" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
}
