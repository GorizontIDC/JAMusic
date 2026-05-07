import MainPage from "./pages/MainPage";
import PersonalAccount from "./pages/PersonalAccount";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
function App() {
  return (
    <div>
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />      
                <Route path="/profile" element={<PersonalAccount />} /> 
            </Routes>
        </BrowserRouter>
    </div>
  );
}
export default App;
