import { useEffect, useState } from 'react';
import { initFttdRequest } from '../../services/BetService';
import GameSTD from '../../components/GameSTD/GameSTD';
import GameLayout from '../../layout/GameLayout';

function Fttd() {

  const [rowsData, setRowsData] = useState([]);

  const handleReset = () => {
    setRowsData(initFttdRequest());
  }

  useEffect(() => {
    handleReset();
  }, []);

  return (
    <GameLayout title='4D/3D/2D'>
      <GameSTD
        rowsData={rowsData}
        setRowsData={setRowsData}
        handleReset={handleReset} />
    </GameLayout>
  );
}

export default Fttd;