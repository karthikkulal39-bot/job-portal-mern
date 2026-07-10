import {toast} from 'sonner';
export const errorToast=(message,options={})=>{
    toast.error(message,{
        position:"top-center",
        icon:"😊",
        style:{
            padding:"10px",
            background:"#F59E0B",
            options

    }
})
}

export const successToast=(message,options={})=>{
    toast.success(message,{
        position:"top-center",
        
        style:{
            padding:"10px",
            options
        }
    })
}
