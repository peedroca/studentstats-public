import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentPage from './pages/StudentPage';
import StudentDetailPage from './pages/StudentDetailPage';

export default function Navigation() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<StudentPage />} />
                <Route path='/detail' element={<StudentDetailPage />} />
            </Routes>
        </BrowserRouter>
    );
}