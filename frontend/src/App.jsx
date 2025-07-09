import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/AppRouter'
import Header from './components/Header'
import Footer from './components/Footer'
import './index.css'
function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <AppRouter />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App