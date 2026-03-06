import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const BookList = lazy(() => import('./pages/BookList'));
const BookDetail = lazy(() => import('./pages/BookDetail'));
const BookUpdate = lazy(() => import('./pages/BookUpdate'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/book' element={<BookList />}/>
          <Route path='/book/:id/update' element={<BookUpdate />}/>
          <Route path='/book/:id' element={<BookDetail />}/>
        </Routes>    
      </Layout>
    </BrowserRouter>
  </StrictMode>,
)
