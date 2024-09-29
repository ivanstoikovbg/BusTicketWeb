import './App.css';
import { AuthProvider } from 'react-auth-kit';
import { Toaster } from './components/ui/toaster';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Auth/Login';
import { Register } from './Pages/Auth/Register';
import { LandingPage } from './Pages/LandingPage/layout';
import { ProductPage } from './Pages/ProductPage/ProductPage';

function App() {
    return (
        <AuthProvider authType={'localstorage'} authName={'x-authorization'}>
            <Toaster />
            <div className='App'>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<LandingPage />} />
                        <Route path='/auth/register' element={<Register />} />
                        <Route path='/auth/login' element={<Login />} />
                        <Route path='/products' element={<ProductPage />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </AuthProvider>
    );
}

export default App;
