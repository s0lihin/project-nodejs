import { registerLocale, setDefaultLocale } from  "react-datepicker";
import id from 'date-fns/locale/id';
import en from 'date-fns/locale/en-US';
import { forwardRef } from "react";
import DatePicker from 'react-datepicker';
import { LOCALES } from "../../i18n/Locale";
import { CookiesConstant, getCookies } from "../../services/CookiesService";
import { CALENDAR_ICON } from "../Icons/Icons";

import './ReactDatepicker.css';
import './OpeningSessionCalendar.scss';



function OpeningSessionCalendar({openingSession, handleDatePicker, minDate , maxDate}) {

    if(getCookies(CookiesConstant.LANGUAGE) && getCookies(CookiesConstant.LANGUAGE) === LOCALES.INDONESIA){
        registerLocale('id', id);
        setDefaultLocale('id');
    }else{
        registerLocale('en', en);
        setDefaultLocale('en');
    }
    
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className='date-picker'>
            <input 
                className='form-control d-inline-block' 
                type="text" 
                value={value} 
                onClick={onClick} 
                ref={ref} 
                readOnly />
            <div className="d-inline-block"  onClick={onClick}>{CALENDAR_ICON}</div>
        </div>
    ));

    return (
        <DatePicker
            id='openingSession'
            dateFormat="dd-MM-yyyy"
            selected={openingSession}
            minDate={minDate}
            maxDate={maxDate}
            onChangeRaw={(e) => e.preventDefault()}
            onChange={handleDatePicker}
            customInput={<ExampleCustomInput />} />
    );
}

export default OpeningSessionCalendar;