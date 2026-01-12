import './App.css'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Startup from './Components/Startup'

function App() {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-white dark:bg-black transition-colors duration-300 sm:px-30 sm:py-10 px-5 py-10">

      <Header />

      <div className="flex-1">
        <Startup />
      </div>

      <hr className='w-full text-black/20 dark:text-white/20  py-1' />
      <div className='absolute bottom-1 mb-1'>
        <Footer />
      </div>
    </div>
  )
}

export default App
