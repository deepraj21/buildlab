import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from '@/pages/Home'
import Space from '@/pages/Space'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/discover" element={<Home />} />
                <Route path="/space/:id" element={<Space />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes