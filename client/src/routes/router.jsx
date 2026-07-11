import {createBrowserRouter} from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import LandingPage from '../components/LandingPage'
import path from 'node:path';
import PageNotFound from '@/components/errors/PageNotFound';
import LoadingScreen from '@/components/errors/LoadingScreen';
import {Suspense,lazy} from 'react'
import OtpPage from "../features/auth/OtpPage"

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
                path:"/signup/otp-verify",
                element:<OtpPage/>
            },
            {
                path:"*",element:<PageNotFound/>
            }
        ]
    },
])

export default router