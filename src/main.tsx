import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './Layout';

const MenuList = lazy(() => import('./MenuList'));
const MenuDetail = lazy(() => import('./MenuDetail'));
const MenuCreate = lazy(() => import('./MenuForm'));
const MenuUpdate = lazy(() => import('./MenuUpdate'));
const HomePage = lazy(() => import('./HomePage'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/menu' element={<MenuList/>}/>
          <Route path='/menu/:id/update' element={<MenuUpdate/>}/>
          <Route path='/menu/:id' element={<MenuDetail/>}/>
          <Route path='/menu/create' element={<MenuCreate/>}/>
        </Routes>    
      </Layout>
    </BrowserRouter>
  </StrictMode>,
)
