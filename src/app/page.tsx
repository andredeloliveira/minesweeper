"use client"
type CellValue = number | 'bomb'

type CellState = "flagged" | "hidden" | "revealed"

type Cell = {
  state: CellState;
  value: CellValue;
}

const MineSweeper = () => {
  const rows: number = 10
  const columns: number = 10
  const cells: Cell[][] = generateBoard(rows, columns)



  function generateBoard(rows: number, columns: number): Cell[][] {
    return Array(rows).fill(null).map(() => {
      return Array(columns).fill(null).map(() => {
        return { state: "hidden", value: Math.random() > 0.8 ? "bomb" : 0}
      })
    })
  }


  // considers the position of the cell, to guarantee it will be updated
  function handleOnClick(i: number, j: number) {
    console.log("clicked")
    console.log(cells[i][j])
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

export default function Home() {
  return (
    <div>
      <MineSweeper />
    </div>
  );
}
