import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from '@/pages/Home'
import Space from '@/pages/Space'
import Explore from '@/pages/Explore'
import Authentication from '@/pages/Authentication'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/auth" element={<Authentication />} />
                <Route path="/space/:id" element={<Space />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes