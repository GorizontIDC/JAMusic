import MainPage from "./pages/MainPage";
import NotFound from './pages/NotFound';
import PersonalAccount from "./pages/PersonalAccount";
import AdminPanel from "./pages/AdminPanel";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from "./utils/providerAUTH";
function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
              <Route path="/" element={<MainPage />} />      
              <Route path="/profile" element={<PersonalAccount />} /> 
              <Route path="*" element={<NotFound />} />
              <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
