type CellValue = number | "💣"

type CellState = "hidden" | "revealed" | "flagged" | "flagged-bomb"

type Cell = {
  state: CellState;
  value: CellValue;
}

export { Cell }
