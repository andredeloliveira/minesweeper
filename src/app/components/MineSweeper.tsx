import { useEffect, useState } from "react"
import { Cell } from "../types"
import { generateBoard } from "../helpers"
import Tile from "./Tile"

const MineSweeper = ({ board, rows, columns }: { board: Cell[][], rows: number, columns: number }) => {
  const [cells, setCells] = useState<Cell[][]>([])
  const [isGameEnded, setIsGameEnded] = useState(false)
  useEffect(() => {
    setCells(board)
  }, [board])

  function handleOnRightClick(i: number, j: number) {
    const cellsToUpdate = [...cells]
    const clickedCell = cellsToUpdate[i][j]
    if (clickedCell.state === "hidden") {clickedCell.state = "flagged"
    } else if (clickedCell.state === "flagged") {
      clickedCell.state = "hidden"
    }
    setCells(cellsToUpdate)
  }

  // considers the position of the cell, to guarantee it will be updated
  function handleOnClick(i: number, j: number) {
    if (isGameEnded) {
      return;
    }
    const cellsToUpdate = [...cells]
    const clickedCell = cellsToUpdate[i][j]
    let bombsAround = 0
    if (clickedCell.value !== "💣") {
      for (let k = i - 1; k <= i+1; k++) {
        for (let l = j -1; l <= j+1; l++) {
          if (k >= rows || l >= columns || k < 0 || l < 0) {
            continue;
          }
          const neighbour = cellsToUpdate[k][l]
          if (neighbour.value === "💣") {
            bombsAround += 1
          }
        }
      }
      clickedCell.value = bombsAround
      clickedCell.state = "revealed"

      if (bombsAround === 0) {
        for (let k = i - 1; k <= i + 1; k++) {
          for (let l = j - 1; l <= j + 1; l++) {
            if (k >= 0 && k < rows && l >= 0 && l < columns && (k !== i || l !== j)) {
              const neighbour = cellsToUpdate[k][l];
              if (neighbour.state === "hidden") {
                handleOnClick(k, l);
              }
            }
          }
        }
      }
      setCells(cellsToUpdate)
    } else {
      setIsGameEnded(true)
      setCells((prevCells: Cell[][]) => {
        return prevCells.map((row) => {
          return row.map((cell) => {
            if (cell.state === "flagged" && cell.value === "💣") {
                return {...cell, state: "flagged-bomb"};
            }
            return cell.value === "💣" ? { ...cell, state: "revealed" } : cell
          })
        })
      })
      alert("game over")
    }
  }

  function renderCells(cells: Cell[][]) {
    return (
      <div className="board">
      {
        cells.map((row, i) => {
          return (
            <div key={i} className="row">
              { row.map((col, j) => {
                  return (
                    <div key={i+j} className="col" onClick={() => handleOnClick(i, j)} onContextMenu={(e) => {
                      e.preventDefault()
                      handleOnRightClick(i, j)
                    }}>
                      <Tile state={col.state} value={col.value} />
                    </div>
                  )
              }) }
            </div>
          )
        })
      }
      </div>
    )
  }
  return (
    <>
      <button
        className="restart-button"
        onClick={() => {
          const newBoard = generateBoard(rows, columns)
          setCells(newBoard)
          setIsGameEnded(false)
        }}
      >Restart</button>
    {renderCells(cells)}
    </>
  )
}

export default MineSweeper;
