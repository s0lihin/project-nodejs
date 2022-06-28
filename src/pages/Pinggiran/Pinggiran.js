import { useEffect, useState } from "react";
import GameLayout from "../../layout/GameLayout";
import { getUserId, getUsername } from "../../services/SecurityService";
import { countTotalBetAmount } from "../../services/BetAmountService";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import PinggiranTable from "../../components/PinggiranTable/PinggiranTable";
import { useDispatch, useSelector } from "react-redux";
import { bet } from "../../services/BetService";
import { getBalanceAPI } from "../../services/CommonService";
import { showAlert } from "../../redux/alert/alert.actions";
import { dateToString, isOpeningSessionValid } from "../../utility/DateUtility";
import { hideLoader, showLoader } from "../../redux/loader/loader.actions";
import { setBalance } from "../../redux/userinfo/userinfo.actions";
import PinggiranDescription from "../../components/PinggiranDescription/PinggiranDescription";
import { getDiscounts, MAX_BETS, MIN_BETS } from "../../services/RuleService";
import { injectIntl } from "react-intl";
import { formatNumber } from "../../services/NumberService";

function Pinggiran(props) {
  const BET_TYPES = [
    "PINGGIRAN.BESAR",
    "PINGGIRAN.KECIL",
    "PINGGIRAN.GENAP",
    "PINGGIRAN.GANJIL"
  ]
  const betTypeName = "Pinggiran";
  const dispatch = useDispatch();
  const shift = useSelector((state) => state.gameReducer.shift);
  const openingSession = useSelector((state) => state.gameReducer.openingSession);
  const balance = useSelector(state => state.userinfoReducer.balance);
  const [betData, setBetData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [rowsData, setRowsData] = useState([]);
  const [totalBetAmount, setTotalBetAmount] = useState(0);

  const initRowsData = () => {
    const request = [];
    const games = ["label.big", "label.small", "label.even", "label.odd"];

    for (let i in games) {
      request.push({
        userId: getUserId(),
        username: getUsername(),
        providerName: "",
        betOn: "",
        betAmountOri: "",
        discount: "",
        betAmount: "",
        openingSession: "",
        shift: 1,
        game: games[i],
        modified: false,
        checked: false,
        gameLabel: games[i],
      });
    }

    return request;
  };

  const showAlertError = (message) => {
    dispatch(showAlert("danger", message));
  };

  const showAlertSuccess = (message) => {
    dispatch(showAlert("success", message));
  };

  const updateRowsData = (index, value, name) => {
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setTotalBetAmount(countTotalBetAmount(rowsInput));
    setRowsData(rowsInput);
  };

  const handleBlur = (index, event) => {
    let newRowsData = [...rowsData];
    let { name, value } = event.target;
    let { betAmountOri } = newRowsData[index];
    let discount = getDiscounts(BET_TYPES[index]);
    let minBet = MIN_BETS[BET_TYPES[index]];
    let maxBet = MAX_BETS[BET_TYPES[index]];

    if (value !== "" && name === "betAmountOri") {
      newRowsData[index]["modified"] = true;
      newRowsData[index]["betType"] = BET_TYPES[index];

      if (betAmountOri >= minBet && betAmountOri <= maxBet) {
        newRowsData[index]["checked"] = true;
        newRowsData[index]["discount"] = discount;
        newRowsData[index]["betAmount"] = betAmountOri - (discount / 100) * betAmountOri;
      } else {
        newRowsData[index]["checked"] = false;
        newRowsData[index]["discount"] = "";
        newRowsData[index]["betAmount"] = "";
        minBet = formatNumber(minBet);
        maxBet = formatNumber(maxBet);
        showAlertError(props.intl.formatMessage({ id: "message.errorMinBetMaxBet" }, { betTypeName, minBet, maxBet }));
      }
    } else {
      newRowsData[index]["checked"] = false;
      newRowsData[index]["discount"] = "";
      newRowsData[index]["betAmount"] = "";
    }

    setTotalBetAmount(countTotalBetAmount(newRowsData));
    setRowsData(newRowsData);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleShowModal = () => {
    let _totalBetAmount = 0;
    let tempBetData = rowsData.filter(function (row) {
      return row.checked;
    });

    if (tempBetData.length === 0) {
      showAlertError(props.intl.formatMessage({ id: "message.noBet" }));
      return;
    }

    if (!isOpeningSessionValid(openingSession)) {
      showAlertError(props.intl.formatMessage({ id: 'message.invalidDate' }));
      return;
    }

    if (!shift) {
      showAlertError(props.intl.formatMessage({ id: 'message.invalidShift' }));
      return;
    }

    if (balance > _totalBetAmount) {
      tempBetData = tempBetData.map((row) => {
        let result = {};

        result["userId"] = row["userId"];
        result["username"] = row["username"];
        result["providerName"] = shift.providerName;
        result["betOn"] = row["num"];
        result["betAmount"] = parseInt(row["betAmountOri"]);
        result["betType"] = row["betType"];
        result["openingSession"] = dateToString(openingSession);
        result["shift"] = shift.shift;

        return result;
      });

      setBetData(tempBetData);
      setShowModal(true);
    } else {
      showAlertError(
        props.intl.formatMessage({ id: "message.insufficientBalance" })
      );
    }

  };

  const handleOkModal = () => {
    if (betData && betData.length > 0) {
      setShowModal(false);
      dispatch(showLoader());

      bet(betData)
        .then(function (response) {
          if (response.data && response.data.length > 0) {
            const status = response.data[0].status;

            if (status === "UNPROCESSABLE_ENTITY") {
              showAlertError(
                props.intl.formatMessage({ id: "message.betFailed" }) + ` (${response.data[0].body})`
              );
            } else {
              setBetData([]);
              setRowsData(initRowsData());
              showAlertSuccess(
                props.intl.formatMessage({ id: "message.betSuccessful" })
              );
              updateBalance();
            }
          } else {
            showAlertError(props.intl.formatMessage({ id: "message.betFailed" }) );
          }

          setTimeout(() => {
            dispatch(hideLoader());
          }, 500);
        })
        .catch(function (error) {
          setTimeout(() => {
            dispatch(hideLoader());
            showAlertError(
              props.intl.formatMessage({ id: "message.betFailed" }) +
              ` (${error.message})`
            );
          }, 500);
        });
    }
  };

  const updateBalance = async () => {
    try {
      const balance = await getBalanceAPI();
      dispatch(setBalance(balance));
    } catch (error) {
      showAlertError(props.intl.formatMessage({ id: "message.errorOnGet" }) + ` (${error.message})`);
    }
  };

  const handleValueChange = (index, values, name) => {
    const { value } = values;
    updateRowsData(index, value, name);
  };

  const handleReset = () => {
    setRowsData(initRowsData());
  };

  useEffect(() => {
    setRowsData(initRowsData());
  }, []);

  return (
    <GameLayout title="Pinggiran">
      <ConfirmationModal
        showModal={showModal}
        message="Lanjut bet?"
        handleCloseModal={handleCloseModal}
        handleOkModal={handleOkModal}
      />

      <PinggiranTable
        rowsData={rowsData}
        handleValueChange={handleValueChange}
        totalBetAmount={totalBetAmount}
        handleSubmit={handleShowModal}
        handleReset={handleReset}
        handleBlur={handleBlur}
      />

      <PinggiranDescription />
    </GameLayout>
  );
}

export default injectIntl(Pinggiran);
