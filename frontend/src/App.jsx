import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// --- NEW IMPORTS FOR NOTIFICATIONS ---
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// -------------------------------------

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

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
import OrderList from './pages/admin/OrderList';
import UserList from './pages/admin/UserList';
import EditProductScreen from './pages/admin/EditProductScreen';
import AdminChat from './pages/admin/AdminChat'; // <--- IMPORT ADDED HERE

// Collection Page (Added based on previous context)
import Collection from './pages/Collection';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          {/* Add ToastContainer here to handle notifications globally */}
          <ToastContainer 
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          
          <Routes>
            {/* --- PUBLIC ROUTES --- */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              
              {/* Note: Ensuring your new Collection routes are here based on previous memory */}
              <Route path="collection/:category" element={<Collection />} />
              <Route path="collection/:category/:subcategory" element={<Collection />} />
              <Route path="track-order" element={<div style={{padding:'50px',textAlign:'center'}}>Track Order</div>} />

              {/* Fallback for old routes if still used */}
              <Route path="pokemon-tcg" element={<PokemonTCG />} />
              <Route path="supplies" element={<Supplies />} />
              
              <Route path="cart" element={<Cart />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* --- ADMIN ROUTES --- */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="productlist" element={<ProductList />} />
                <Route path="product/:id/edit" element={<EditProductScreen />} />
                <Route path="orderlist" element={<OrderList />} />
                <Route path="userlist" element={<UserList />} />
                <Route path="chat" element={<AdminChat />} /> {/* <--- ROUTE ADDED HERE */}
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;