import { Route, Routes, Navigate } from 'react-router-dom';
import Take1 from "./Takes/Take1";
import Take2 from "./Takes/Take2";
import Take3 from "./Takes/Take3";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/take1" />} />
      <Route path="/take1" element={<Take1 />} />
      <Route path="/take2" element={<Take2 />} />
      <Route path="/take3" element={<Take3 />} />
    </Routes>
  )
}

export default App;
