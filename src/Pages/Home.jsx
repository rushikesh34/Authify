import React from 'react'
import MenuBar from '../Components/MenuBar'
import Header from '../Components/Header'

function Home() {
  return (
    <div className="flex flex-col item-center justify-content-center min-vh-100">
        <MenuBar/>
        <Header/>
    </div>

  )
}

export default Home