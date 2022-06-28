import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { injectIntl } from 'react-intl';
import OpeningSessionCalendar from "../components/OpeningSessionCalendar/OpeningSessionCalendar";
import { getProviders } from "../services/CommonService";
import SecuredLayout from "./SecuredLayout";
import { setShift, setOpeningSession } from "../redux/game/game.actions";
import { hideLoader, showLoader } from '../redux/loader/loader.actions';
import { addDate } from "../utility/DateUtility";
import { showAlert } from "../redux/alert/alert.actions";
import { CookiesConstant, getCookies } from "../services/CookiesService";

function GameLayout(props) {

    const dispatch = useDispatch();
    const shift = useSelector(state => state.gameReducer.shift);
    const openingSession = useSelector(state => state.gameReducer.openingSession);
    const [shiftsGroup, setShiftsGroup] = useState([]);

    const handleSelectShift = (shift) => {
        if (shift.status === 'open') {
            dispatch(setShift(shift));
        } else {
            showAlertError(props.intl.formatMessage({ id: 'message.shiftClosed' }));
        }

    }

    const handleDatePicker = (date) => {
        dispatch(setOpeningSession(date));
    }

    const showAlertError = (message) => {
        dispatch(showAlert('danger', message));
    }

    const getShiftClass = (sh, shift) => {
        if (sh.status !== 'open') {
            return 'd-flex shift-item shift-close'
        } else if (sh && shift && sh.providerName === shift.providerName && sh.shift === shift.shift) {
            return 'd-flex shift-item shift-selected';
        } else {
            return 'd-flex shift-item shift-open';
        }
    }

    const getProviderName = (providerName) => {
        if (providerName) {
            return providerName.replace("Pools", "") + ' Pools';
        } else {
            return providerName;
        }
    }

    const closeLoader = () => {
        setTimeout(() => {
            dispatch(hideLoader());
        }, 500);
    }

    useEffect(() => {
        (async () => {
            try {
                dispatch(showLoader());
                const data = await getProviders();
                setShiftsGroup(data.shiftsGroup);

                if (!shift) {
                    if (getCookies(CookiesConstant.GAME_ID) && data.shifts) {
                        let selecteds = data.shifts.filter(sh => sh.status === 'open' && sh.providerName.toLowerCase() === getCookies(CookiesConstant.GAME_ID).toLowerCase());

                        if (selecteds.length > 0) {
                            dispatch(setShift(selecteds[0]));
                        } else {
                            dispatch(setShift(data.shift));
                        }
                    }
                }

                closeLoader();
            } catch (error) {
                closeLoader();
                showAlertError(props.intl.formatMessage({ id: 'message.errorOnGet' }) + ` (${error.message})`);
            }
        })();


    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <SecuredLayout>
            <div className='w-100'>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="d-flex justify-content-center align-items-start flex-wrap shifts">
                        {
                            Object.keys(shiftsGroup).map((key, j) => (
                                <div key={j} className="d-flex flex-column justify-content-center align-items-center flex-wrap group">
                                    {
                                        shiftsGroup[key].map((sh, i) => (
                                            <div key={j + i} className={getShiftClass(sh, shift)} onClick={() => handleSelectShift(sh)} >
                                                <span>{getProviderName(sh.providerName)}</span><span>{sh.time}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="content-header d-flex align-items-center">
                    <div className="d-flex me-auto text-shadow">
                        <span>{shift ? getProviderName(shift.providerName) + ' ' + shift.time : ''}</span>
                        <span className="ms-1 ms-sm-2">-</span>
                        <span className="ms-1 ms-sm-2">{props.title}</span>
                    </div>
                    <div className="d-flex">
                        <OpeningSessionCalendar
                            openingSession={openingSession}
                            minDate={new Date()}
                            maxDate={addDate(3)}
                            handleDatePicker={handleDatePicker} />
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="content-box">
                        <form autoComplete="off">
                            {props.children}
                        </form>
                    </div>
                </div>
            </div>

        </SecuredLayout>
    )
}

export default injectIntl(GameLayout);