import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from '@/pages/Home'
import Space from '@/pages/Space'
import Explore from '@/pages/Explore'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/space/:id" element={<Space />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes