import { useState } from 'react';
import Overview from './components/Overview/Overview';
import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import CustomRoutes from './components/routes/Routes';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/*" element={<CustomRoutes />} />
        </Routes>
      </div>
      <Overview />
    </div>
  );
}

export default App;
