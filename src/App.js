import React from "react"
// ROUTER
import { BrowserRouter, Routes, Route } from "react-router-dom"
// COMPONENTS
import { Content } from "./components/Content"
import { Footer } from "./components/Footer"
import { Title } from "./components/Title"
import { Carico } from "./components/Carico"
import { Error } from "./components/Error"
import { Scarico } from "./components/Scarico"
import { Logs } from "./components/Logs"
// CONTEXT
import { ContextProvider } from "./context"

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <div className="container">
          <div className="content">
            <Title />
            <Routes>
              <Route path="*" element={<Error />} />
              <Route path="/" element={<Content />} />
              <Route path="/carico" element={<Carico />} />
              <Route path="/scarico" element={<Scarico />} />
              <Route path="/logs" element={<Logs />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </ContextProvider>
    </BrowserRouter>
  )
}

export default App
