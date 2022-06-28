import { INVALID_ICON, VALID_ICON } from "../components/Icons/Icons";

export const isValid = (modified, checked) => {
    const valid = <span className='text-success svg-shadow'>{VALID_ICON}</span>;
    const invalid = <span className='text-danger svg-shadow'>{INVALID_ICON}</span>;
    
    if(modified && checked){
        return valid;
    }else if(modified && !checked){
        return invalid;
    }else{
        return '';
    }
}