import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout'; // New Layout

// Components
import AdminRoute from './components/AdminRoute';

// Pages - Public
import Home from './pages/Home';
import PokemonTCG from './pages/PokemonTCG';
import Supplies from './pages/Supplies';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Pages - Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductList from './pages/admin/ProductList';
import ProductEdit from './pages/admin/ProductEdit';
import OrderList from './pages/admin/OrderList';
import UserList from './pages/admin/UserList';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            
            {/* --- PUBLIC ROUTES (With Standard Navbar) --- */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="pokemon-tcg" element={<PokemonTCG />} />
              <Route path="supplies" element={<Supplies />} />
              <Route path="cart" element={<Cart />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* --- ADMIN ROUTES (With Sidebar Navbar) --- */}
            {/* 1. Check if user is admin (AdminRoute) */}
            {/* 2. Apply Admin Layout */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="productlist" element={<ProductList />} />
                <Route path="product/:id/edit" element={<ProductEdit />} />
                <Route path="orderlist" element={<OrderList />} />
                <Route path="userlist" element={<UserList />} />
              </Route>
            </Route>

            {/* Catch All */}
            <Route path="*" element={<NotFound />} />
            
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;