import { toast } from "react-toastify"
 
 
function notify(msg,type) {
  
    switch(type){
        case 'success':
            toast.success(msg)
            break;
            case 'error':
                toast.error(msg)
                break;
            default:
                toast(msg)
    }

}

export default notify