import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from '@/pages/Home'
import Space from '@/pages/Space'
import Explore from '@/pages/Explore'
import Auth from '@/pages/Auth'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/space/:id" element={<Space />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes