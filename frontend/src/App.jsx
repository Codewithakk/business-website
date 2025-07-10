import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/AppRouter'
import Header from './components/Header'
import Footer from './components/Footer'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flexGrow: 1 }}>
          <AppRouter />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
