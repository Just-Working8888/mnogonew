
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Main from './Layout/Main/Main'
import { lazy, Suspense } from 'react'
import { Spin } from 'antd'
const MainPage = lazy(() => import('./routes/MainPage/MainPage'))
const ProductSelectedPage = lazy(() => import('./routes/ProductSelectedPage/ProductSelectedPage'))
const OrderPage = lazy(() => import('./routes/OrderPage/OrderPage'))
const Categories = lazy(() => import('./routes/Categories/Categories'))
function App() {

  return (

    <Routes>
      <Route path='/' element={<Main />}>
        <Route path='/' element={<Suspense fallback={<Spin spinning={true} fullscreen />}><MainPage /></Suspense>} />
        <Route path='product/:id' element={<Suspense fallback={<Spin fullscreen spinning={true} />}><ProductSelectedPage /></Suspense>} />
        <Route path='order' element={<Suspense fallback={<Spin fullscreen spinning={true} />} ><OrderPage /></Suspense>} />
        <Route path='categories' element={<Suspense fallback={<Spin fullscreen spinning={true} />} ><Categories /></Suspense>} />

      </Route>
    </Routes>




  )
}

export default App
