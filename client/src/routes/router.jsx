import {createBrowserRouter} from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import LandingPage from '../components/LandingPage'
import SignUp from '@/features/auth/SignUp'

const router = createBrowserRouter([
    {
        element:<MainLayout/>,
        children:[
            {path:'/',element:<LandingPage/>},
        ]
    },
    {
        element:<MainLayout/>,
        children:[
            {path:"/signup",element:<SignUp/>}
        ]
    }
])

export default router