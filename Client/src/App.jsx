import { useState, useEffect } from 'react'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Intro from './pages/Intro/Intro'
import { AnimatePresence, motion } from 'framer-motion'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time to show the animation
    const timer = setTimeout(() => {
      setLoading(false)
    }, 4500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-black min-h-screen">
      <Cursor />
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-screen"
        >
          <Intro />
        </motion.div>
      )}
    </div>
  )
}

export default App
