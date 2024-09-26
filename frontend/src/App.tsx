import { Routes, Route } from 'react-router-dom';
import Users from './pages/admin/User/Users';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      {/* <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default App;
