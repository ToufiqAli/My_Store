import { Routes, Route } from "react-router-dom";
import  Admin from '../src/Pages/Admin'

function App() {
  return (

    <Routes>
      <Route path="/Admin/*" element={<Admin />}/>
    </Routes>
  );
}

export default App;