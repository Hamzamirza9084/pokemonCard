// ... existing imports
import ChatWidget from '../components/ChatWidget/ChatWidget'; // Updated import

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Navbar />
      <main>
        <Outlet />
      </main>
      {/* Replaced WhatsappChat with ChatWidget */}
      <ChatWidget /> 
    </div>
  );
};
export default MainLayout;