import { Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import PostGrid from "./components/Post"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    )    
}

export default App
