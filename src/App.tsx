import { Route, Routes, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material";
import Take1 from "./Takes/Take1";
import Take2 from "./Takes/Take2";
import Take3 from "./Takes/Take3";

const theme = createTheme();
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Navigate to="/take1" />} />
        <Route path="/take1" element={<Take1 />} />
        <Route path="/take2" element={<Take2 />} />
        <Route path="/take3" element={<Take3 />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App;
