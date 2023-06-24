import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import animationData from './animations/resize.json';
import { FiInfo } from 'react-icons/fi';
import './App.css';

document.title = "Calculadora de Piso";
const App = () => {
  const lottieContainerRef = useRef(null);
  const [area1, setArea1] = useState('');
  const [area2, setArea2] = useState('');
  const [totalArea, setTotalArea] = useState('');
  const [pieceHeight, setPieceHeight] = useState('');
  const [pieceWidth, setPieceWidth] = useState('');
  const [totalPieceArea, setTotalPieceArea] = useState('');
  const [totalQuantity, setTotalQuantity] = useState('');
  const [totalWithLoss, setTotalWithLoss] = useState('');
  const [lossPercentage, setLossPercentage] = useState('10%');
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (lottieContainerRef.current && lottieContainerRef.current.childNodes.length === 0) {
      lottie.loadAnimation({
        container: lottieContainerRef.current,
        animationData,
        loop: true,
        autoplay: true,
      });
    }
  }, []);

  const handleCalculateArea = () => {
    const parsedArea1 = parseFloat(area1);
    const parsedArea2 = parseFloat(area2);

    if (!isNaN(parsedArea1) && !isNaN(parsedArea2)) {
      const calculatedArea = parsedArea1 * parsedArea2;
      setTotalArea(calculatedArea.toFixed(2));
    } else {
      setTotalArea('');
    }
  };

  const handleCalculatePieceArea = () => {
    const parsedHeight = parseFloat(pieceHeight);
    const parsedWidth = parseFloat(pieceWidth);

    if (!isNaN(parsedHeight) && !isNaN(parsedWidth)) {
      const calculatedArea = parsedHeight * parsedWidth;
      setTotalPieceArea(calculatedArea.toFixed(2));
    } else {
      setTotalPieceArea('');
    }
  };

  const handleCalculateTotalPieces = () => {
    const parsedTotalArea = parseFloat(totalArea);
    const parsedTotalPieceArea = parseFloat(totalPieceArea);

    if (!isNaN(parsedTotalArea) && !isNaN(parsedTotalPieceArea) && parsedTotalPieceArea !== 0) {
      const totalQuantity = (parsedTotalArea / parsedTotalPieceArea).toFixed(2);
      setTotalQuantity(totalQuantity);
    } else {
      setTotalQuantity('');
    }
  };

  const handleCalculateLoss = () => {
    const parsedTotalQuantity = parseFloat(totalQuantity);

    if (!isNaN(parsedTotalQuantity)) {
      const calculatedLoss = parsedTotalQuantity * parseFloat(lossPercentage) / 100;
      const totalWithLoss = parsedTotalQuantity + calculatedLoss;
      setTotalWithLoss(totalWithLoss.toFixed(2));
    } else {
      setTotalWithLoss('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleCalculateTotalPieces();
      handleCalculateLoss();
    }
  };

  const handleCalculate = () => {
    handleCalculateArea();
    handleCalculatePieceArea();
    handleCalculateTotalPieces();
    handleCalculateLoss();
  };

  useEffect(() => {
    if (totalQuantity && !isNaN(totalQuantity) && !isNaN(totalWithLoss)) {
      handleCalculateLoss();
    }
  }, [totalQuantity, totalWithLoss]);

  return (
    <div className="app">
      <div className="title-container">
        <h1 className="title">Cálculo de<br />Quantidade de Piso</h1>
        
      </div>
      <div className="container">
        <div className="left-container">
          <div ref={lottieContainerRef} style={{ width: '600px', height: '600px' }}></div>
          {totalQuantity && (
            <h2 className="resultado-text show-result-text">
              Arredondando para cima <br />
              a quantidade de Pisos é: <br />
              
            </h2>
          )}
          {totalQuantity && (
            <h1 className="resultado-text show-result-text-number">
              
              {isNaN(totalQuantity) || isNaN(totalWithLoss) ? '' : Math.ceil(parseFloat(totalQuantity) + parseFloat(totalWithLoss) * 0.1)}
            </h1>
          )}
        </div>
        <div className="right-container">
          <label htmlFor="area-input">
            <span className="circle circle-orange1">1</span>
            <span className="label-text">- Calcular área total do ambiente</span>
          </label>
          <div className="input-container">
            <input
              type="number"
              id="area-input"
              placeholder="Área 1"
              value={area1}
              onChange={(e) => setArea1(e.target.value)}
              onBlur={handleCalculateArea}
              inputMode="numeric"
            />
            <span className="input-operator">x</span>
            <input
              type="number"
              placeholder="Área 2"
              value={area2}
              onChange={(e) => setArea2(e.target.value)}
              onBlur={handleCalculateArea}
            />
            <span className="input-operator">=</span>
            <input type="text" value={totalArea} readOnly />
          </div>

          <label htmlFor="piece-input">
            <span className="circle circle-orange2">2</span>
            <span
              className="label-text2"
              onMouseEnter={() => setShowMessage(true)}
              onMouseLeave={() => setShowMessage(false)}
            >
              - Área de uma peça em (cm²) <FiInfo />
            </span>
            {showMessage && (
              <div className="tooltip">
                EX: 0,6 x 0,6 = 0,36cm²
              </div>
            )}
          </label>

          <div className="input-container">
            <input
              type="number"
              id="piece-height-input"
              placeholder="Altura (cm)"
              value={pieceHeight}
              onChange={(e) => setPieceHeight(e.target.value)}
              onBlur={handleCalculatePieceArea}
            />
            <span className="input-operator">x</span>
            <input
              type="number"
              id="piece-width-input"
              placeholder="Largura (cm)"
              value={pieceWidth}
              onChange={(e) => setPieceWidth(e.target.value)}
              onBlur={handleCalculatePieceArea}
            />
            <span className="input-operator">=</span>
            <input type="text" placeholder="Área (cm²)" value={totalPieceArea} readOnly />
          </div>

          <label htmlFor="piece-total-input">
            <span className="circle circle-orange2">3</span>
            <span className="label-text3">- Área ambiente / Peça</span>
          </label>
          <div className="input-container">
            <input
              type="number"
              id="piece-total-input"
              placeholder="Área total"
              value={totalArea}
              onChange={(e) => setTotalArea(e.target.value)}
              onBlur={handleCalculateTotalPieces}
            />
            <span className="input-operator">/</span>
            <input
              type="number"
              placeholder="Área da peça"
              value={totalPieceArea}
              onChange={(e) => setTotalPieceArea(e.target.value)}
              onBlur={handleCalculateTotalPieces}
            />
            <span className="input-operator">=</span>
            <input type="text" placeholder="Quantidade necessária" value={totalQuantity} readOnly />
          </div>

          <label htmlFor="loss-input">
            <span className="circle circle-orange3">4</span>
            <span className="label-text4">- Acrescentar perdas 10%</span>
          </label>
          <div className="input-container">
            <input
              type="text"
              id="loss-input"
              placeholder="Perda (%)"
              value={totalQuantity}
              onChange={(e) => setLossPercentage(e.target.value)}
              onBlur={handleCalculateLoss}
            />
            <span className="input-operator">+</span>
            <input
              type="number"
              placeholder="Quantidade"
              value={totalPieceArea}
              readOnly
            />
            <span className="input-operator">=</span>
            <input
              type="text"
              placeholder="Quantidade com perdas"
              value={totalWithLoss}
              readOnly
            />
          </div>

          

          <button className="calculate-button" onClick={handleCalculate}>
            Calcular
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
