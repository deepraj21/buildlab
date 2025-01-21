import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from '@/pages/Home'
import Space from '@/pages/Space'
import Explore from '@/pages/Explore'
import Auth from '@/pages/Auth'
import Build from '@/pages/Build'
import Privacy from '@/pages/Privacy'
import Terms from '@/pages/Terms'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/build" element={<Build />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="terms" element={<Terms/>} />
                <Route path="/space/:id" element={<Space />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes