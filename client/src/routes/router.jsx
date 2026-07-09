import {createBrowserRouter} from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import LandingPage from '../components/LandingPage'
import path from 'node:path';
import PageNotFound from '@/components/errors/PageNotFound';
import LoadingScreen from '@/components/errors/LoadingScreen';
import {Suspense,lazy} from 'react'
const Signup = lazy(() =>import('../features/auth/SignUp'));
const router = createBrowserRouter([
    {
        
        element:<MainLayout/>,
        errorElement:<PageNotFound/>,
        children:[
            {
                path:'/',element:<LandingPage/>
            },
            {
                path:"/signup",element:(
                <Suspense fallback={<LoadingScreen/>}>
                  <Signup/>
                </Suspense>
              )
            },
            {
                path:"*",element:<PageNotFound/>
            }
        ]
    },
])

export default router