import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ConfigProvider } from 'antd'
import ru_RU from 'antd/es/locale/ru_RU'
import colors from './scss/variables/colors.module.scss';
import { Provider } from 'react-redux'
import store from './store/index.ts'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider locale={ru_RU} theme={{
        token: {
          colorPrimary: colors.primary50,
          colorPrimaryHover: colors.primary100,
          colorBgLayout: colors.white,
          // colorBorder: colors.primaryborder,
          // colorText: colors.primarytext,
          // colorBgTextActive: colors.lightgrayfill,
          // colorBgTextHover: colors.lightgrayfill,
          // colorFillAlter: colors.lightgrayfill,
          // colorBgElevated: colors.lightgrayfill,
        },
      }}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>

)
