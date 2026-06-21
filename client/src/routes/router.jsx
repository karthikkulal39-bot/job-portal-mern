import {createBrowserRouter} from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import LandingPage from '../components/LandingPage'
import SignUp from '@/features/auth/SignUp'
import path from 'node:path';
import PageNotFound from '@/components/errors/PageNotFound';

const router = createBrowserRouter([
    {
        
        element:<MainLayout/>,
        errorElement:<PageNotFound/>,
        children:[
            {
                path:'/',element:<LandingPage/>
            },
            {
                path:"/signup",element:<SignUp/>
            },
            {
                path:"*",element:<PageNotFound/>
            }
        ]
    },
])

export default router