import React from 'react'
import ReactDOM from 'react-dom/client'
import SalaProApp from './App.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <SalaProApp />
  </React.StrictMode>
)

// Remove splash screen once React has mounted
requestAnimationFrame(() => {
  const splash = document.getElementById('splash')
  if (splash) {
    splash.style.opacity = '0'
    splash.style.pointerEvents = 'none'
    setTimeout(() => splash.remove(), 350)
  }
})
