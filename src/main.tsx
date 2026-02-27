import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const MenuList = lazy(() => import('./pages/MenuList'));
const MenuDetail = lazy(() => import('./pages/MenuDetail'));
const MenuCreate = lazy(() => import('./pages/MenuForm'));
const MenuUpdate = lazy(() => import('./pages/MenuUpdate'));
const HomePage = lazy(() => import('./pages/HomePage'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/menu' element={<MenuList/>}/>
          <Route path='/menu/:id/update' element={<MenuUpdate/>}/>
          <Route path='/menu/:id' element={<MenuDetail/>}/>
          <Route path='/menu/create' element={<MenuCreate/>}/>
        </Routes>    
      </Layout>
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
