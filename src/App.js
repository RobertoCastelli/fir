import React from "react"
// ROUTER
import { BrowserRouter, Routes, Route } from "react-router-dom"
// COMPONENTS
import { Content } from "./components/Content"
import { Footer } from "./components/Footer"
import { Title } from "./components/Title"
import { Carico } from "./components/Carico"
import { Scarico } from "./components/Scarico"
import { Log } from "./components/Log"
import { Error } from "./components/Error"

import { ContextProvider } from "./context"

function App() {
  return (
    <ContextProvider>
      <div className="container">
        <div className="content">
          <BrowserRouter>
            <Title />
            <Routes>
              <Route path="*" element={<Error />} />
              <Route path="/" element={<Content />} />
              <Route path="/carico" element={<Carico />} />
              <Route path="/scarico" element={<Scarico />} />
              <Route path="/log" element={<Log />} />
            </Routes>
          </BrowserRouter>
        </div>
        <Footer />
      </div>
    </ContextProvider>
  )
}

export default App

//********************
/* TODO: 
/* add button new CER  
**********************/
