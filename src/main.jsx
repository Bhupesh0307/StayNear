import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Components/Home/Home.jsx'
import About from './Components/About/About.jsx'
import Contact from './Components/Contact/Contact.jsx'
import GuestHouses from './Components/Guest House/guest-house.jsx'
import Upload from './Components/Upload/Upload.jsx'
import PolicyPage from './Components/Policy Page/policyPage.jsx'
import { Route } from 'react-router-dom'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='guest-house' element={<GuestHouses />} />
      <Route path='upload-guest-house' element={<Upload />} />
      <Route path='policy-page' element={<PolicyPage />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
