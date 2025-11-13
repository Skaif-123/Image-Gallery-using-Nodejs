import { Route, Routes, useParams } from "react-router-dom";
import Home from "./pages/Home";
import ViewImage from "./pages/ViewImage";
function App() {
  const {id}=useParams()
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path={`imageSingle/:id`} element={<ViewImage />} />
      </Routes>
    </>
  );
}

export default App;
