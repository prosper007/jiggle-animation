import { Route, Routes, Navigate } from 'react-router-dom';
import Take1 from "./Takes/Take1";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/take1" />} />
      <Route path="/take1" element={<Take1 />} />
    </Routes>
  )
}

export default App;
