"use client"

import { useEffect, useState } from "react";

type CellValue = number | 'bomb'

type CellState = "flagged" | "hidden" | "revealed"

type Cell = {
  state: CellState;
  value: CellValue;
}

type GameBoard = {
  rows: number;
  columns: number;
}


const MineSweeper = ({ board, rows, columns }: { board: Cell[][], rows: number, columns: number }) => {
  const [cells, setCells] = useState<Cell[][]>([])

  useEffect(() => {
    setCells(board)
  }, [board])

  // considers the position of the cell, to guarantee it will be updated
  function handleOnClick(i: number, j: number) {
    const cellsToUpdate = [...cells]
    const clickedCell = cellsToUpdate[i][j]
    let bombsAround = 0
    if (clickedCell.value !== 'bomb') {
      for (let k = i - 1; k <= i+1; k++) {
        for (let l = j -1; l <= j+1; l++) {
          if (k >= rows || l >= columns || k < 0 || l < 0) {
            continue;
          }
          const neighbour = cellsToUpdate[k][l]
          if (neighbour.value === 'bomb') {
            bombsAround += 1
          }
        }
      }
      clickedCell.value = bombsAround
      setCells(cellsToUpdate)
    } else {
      alert('game over')
    }
  }

  return (
    <div>
      { cells.map((row, i) => {
        return (
          <div key={i} className="row">
            { row.map((col, j) => {
                return (
                  <div key={i+j} className="col" onClick={() => handleOnClick(i, j)}>
                    <CellComponent state={col.state} value={col.value} />
                  </div>
                )
            }) }
          </div>
        )
      }) }
    </div>
  )
}

function CellComponent(props: Cell) {
  return (
    <div className={`cell`}>
      <span>{props.value}</span>
    </div>
  )
}


function generateBoard(rows: number, columns: number): Cell[][] {
  return Array(rows).fill(null).map(() => {
    return Array(columns).fill(null).map(() => {
      return { state: "hidden", value: Math.random() > 0.8 ? "bomb" : 0}
    })
  })
}

export default function Home() {
  const rows = 10
  const columns = 10
  const seededBoard: Cell[][] = generateBoard(rows, columns)
  return (
    <div>
      <MineSweeper board={seededBoard} rows={rows} columns={columns}/>
    </div>
  );
}
