import {toast} from 'sonner';
export const errorToast=(message,options={})=>{
    toast.error(message,{
        style:{
            padding:"10px",
            background:"green",
            options

    }
})
}

export const successToast=(message,options={})=>{
    toast.success(message,{
        style:{
            padding:"10px",
            options
        }
    })
}
