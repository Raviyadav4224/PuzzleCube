import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const shuffleValue = [
    [
      [1, 3, 5],
      [2, 4, 6],
      [8, 7, null],
    ],
    [
      [2, 1, 8],
      [3, 4, 7],
      [5, 6, null],
    ],
    [
      [4, 7, 1],
      [5, 2, null],
      [6, 8, 3],
    ],
    [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, null],
    ],[
      [1, 2, 3],
      [4, 5, 6],
      [7, null, 8],
    ],
  ];
  const [shuffledValue, setShuffledValue] = useState([]);
  const [chances, setChances] = useState(50);
  const isValidMove = (row, col) => {
    let nullCol;
    let nullRow;
    shuffledValue.forEach((item, index) => {
      if (item.indexOf(null) !== -1) {
        nullCol = item.indexOf(null);
        nullRow = index;
      }
    });
    if (
      (nullRow === row && Math.abs(nullCol - col) === 1) ||
      (nullCol === col && Math.abs(nullRow - row) === 1)
    ) {
      if (chances === 0) {
        return false;
      } else {
        let newArr = shuffledValue.map((item) => [...item]);
        newArr[nullRow][nullCol] = shuffledValue[row][col];
        newArr[row][col] = null;
        setShuffledValue(newArr);
        return true;
      }
    }
  };
  const generateRandom = () => {
    const randomIndexGenerated = Math.floor(Math.random() * 5);
    setShuffledValue(shuffleValue[randomIndexGenerated]);
  };
  useEffect(() => {
    generateRandom();
  }, []);

  const [win, setWin] = useState(false);
  useEffect(() => {
    // check whether player wins or not
    const winArr = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, null],
    ];
    setWin(shuffledValue.toString() === winArr.toString());
  }, [shuffledValue]);
  return (
    <>
      <div>
        <h1>Magic Cube</h1>
        <div>
          <table>
            <tbody>
              {shuffledValue.map((item, index) => {
                return (
                  <tr key={index}>
                    {item.map((val, ind) => (
                      <td
                        key={ind}
                        className="tdValue"
                        onClick={() => {
                          if (isValidMove(index, ind)) {
                            setChances((prev) => (prev !== 0 ? prev - 1 : 0));
                          }
                        }}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h2>{chances === 0 && !win ? "Try Again" : null}</h2>
          <h2>{win ? "Puzzle Solved" : null}</h2>
          <h2>Remaining Chances : {chances}</h2>
          <button
            onClick={() => {
              setChances(50);
              generateRandom();
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
