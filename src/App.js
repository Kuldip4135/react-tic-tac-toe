import { useState } from "react";
import Icon from "./components/Icon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const itemArray = [
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
  "empty",
];

const App = () => {
  const [isCross, setIsCross] = useState(true);
  const [winMessage, setWinMessage] = useState("");
  const [isActive, setActive] = useState(false);

  //To Reload Game
  const reloadGame = () => {
    setIsCross(false);
    setWinMessage("");
    itemArray.fill("empty", 0, 9);
    setActive(!isActive);
  };

  //To Check Winner
  const checkIsWinner = () => {
    //Checking Rows
    if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[1] &&
      itemArray[1] === itemArray[2]
    ) {
      setWinMessage(`${itemArray[0]} Wins!!! 🥳🥳🎉`);
    } else if (
      itemArray[3] !== "empty" &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]
    ) {
      setWinMessage(`${itemArray[3]} Wins!!! 🥳🥳🎉`);
    } else if (
      itemArray[6] !== "empty" &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[6]} Wins!!! 🥳🥳🎉`);
    }

    //Checking Cols
    else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[0]} Wins!!! 🥳🥳🎉`);
    } else if (
      itemArray[1] !== "empty" &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      setWinMessage(`${itemArray[1]} Wins!!! 🥳🥳🎉`);
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[2]} Wins!!! 🥳🥳🎉`);
    }

    //Checking Diagonals
    else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[0]} Wins!!! 🥳🥳🎉`);
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[2]} Wins!!! 🥳🥳🎉`);
    }

    //Game Draw
    else if (
      itemArray[0] !== "empty" &&
      itemArray[1] !== "empty" &&
      itemArray[2] !== "empty" &&
      itemArray[3] !== "empty" &&
      itemArray[4] !== "empty" &&
      itemArray[5] !== "empty" &&
      itemArray[6] !== "empty" &&
      itemArray[7] !== "empty" &&
      itemArray[8] !== "empty" &&
      itemArray[9] !== "empty"
    ) {
      setWinMessage("Game Draw !!! No One Wins");
    }
  };

  const changeItem = (itemNumber) => {
    //Show Win Message
    if (winMessage) {
      return toast(winMessage, { type: "success" });
    }

    //Fill Box With Cross or Circle & If It Is Already Filled Then Give Error
    if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = isCross ? "cross" : "circle";
      setIsCross(!isCross);
    } else {
      return toast("Already Filled", { type: "info" });
    }

    checkIsWinner();
  };

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <div className="container py-5">
      <ToastContainer position="bottom-center" />
      <div className="row">
        <div className="col-md-4 offset-md-4 col-12">
          <h2 className="text-center mb-5">👻 Tic Tac Toe 👻</h2>

          {/* Player Will Choose X or O */}
          <div
            className={
              isActive
                ? "d-none"
                : "d-flex align-items-center justify-content-between"
            }
            onClick={handleToggle}
          >
            <button
              className="btn btn-info"
              onClick={() => {
                setIsCross(true);
              }}
            >
              Player X
            </button>
            <button className="btn btn-info" onClick={() => setIsCross(false)}>
              Player O
            </button>
          </div>

          {/* Game Board */}
          <div className={isActive ? "grid fade-in" : "grid"}>
            {itemArray.map((item, index) => (
              <div
                className="card"
                key={index}
                onClick={() => changeItem(index)}
              >
                <div className="card-body box">
                  <Icon name={item} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {winMessage ? (
        <>
          <div className="mt-5 text-center ">
            <h3 className="text-uppercase mb-4">{winMessage}</h3>
            <button className="btn btn-info" onClick={reloadGame}>
              Play Again!!
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mt-5">
            <h3 className="text-center">{isCross ? "X" : "O"} Turn</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
