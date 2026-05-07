import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SearchPage() {
    return (
        <div className="App">
            <Header />
                <BrowserRouter basename="/"> 
                <ToastContainer position="top-right" autoClose={3000} />
                <Routes>
                    <Route path="/" element={<MainPage searchResults={searchResults} />} />
                    <Route path="/chat" element={<SearchPage onSearch={handleSearch} />} />
                    <Route path="/user" element={<ProtectedRoute />}/>
                    <Route path="*" element={<div><h2>404</h2><a href="/">Домой</a></div>} />
                </Routes>
                </BrowserRouter>
            <Footer />
        </div>
    )
}
export default SearchPage;