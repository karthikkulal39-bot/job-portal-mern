import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import router from './routes/router'
import {Suspense} from 'react'
import LoadingScreen from './components/errors/LoadingScreen'
function App() {
 
  return (  
    <Suspense fallback={<LoadingScreen/>}>
      <RouterProvider router={router}/>
  </Suspense>
  )
}

export default App
