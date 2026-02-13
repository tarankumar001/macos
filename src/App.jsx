import React from 'react'
import Navbar from './components/Navbar'
import Dock from './components/dock'
import {Draggable} from "gsap/Draggable"
import gsap from 'gsap'
import Terminal from './Terminal'
gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar/> 
      <Dock/>
      <Terminal/>
    </main>
  )
}

export default App