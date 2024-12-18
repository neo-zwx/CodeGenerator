import Navbar from "./component/Navbar"
import CSS from "./pages/CSS"
import Home from "./pages/Home"
import Feedback from "./pages/Feedback"
import DesignSelect from "./pages/DesignSelect"
import { Route, Routes } from "react-router-dom"
import SQLconnection from "./pages/SQLconnection"
import AddTemplate from "./serverpages/AddTemplates"
import ReadFeedback from "./serverpages/ReadFeedback"
import UpdateTemplates from "./serverpages/UpdateTemplates"
import ReadTemplates from "./serverpages/ReadTemplates"
import "./css/style.css"
import ReactTemplate from "./pages/ReactTemplate"
import LearnDesignPattern from "./pages/LearnDesignPattern"


function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CSS" element={<CSS />} />
          <Route path="/ReactTemplate" element={<ReactTemplate />} />
          <Route path="/Feedback" element={<Feedback />} />
          <Route path="/designselect" element={<DesignSelect />} />
          <Route path="/SQLconnection" element={<SQLconnection />} />
          <Route path="/AddTemplate" element={<AddTemplate />} />
          <Route path="/ReadFeedback" element={<ReadFeedback />} />
          <Route path="/UpdateTemplates/:id" element={<UpdateTemplates />} />
          <Route path="/ReadTemplates" element={<ReadTemplates />} />
          <Route path="/LearnDesignPattern" element={<LearnDesignPattern />} />
        </Routes>
      </div>
    </>
  )
}

export default App
