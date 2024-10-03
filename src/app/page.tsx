"use client"

import MineSweeper from "./components/MineSweeper";
import { generateBoard } from "./helpers";
import { Cell } from "./types";

export default function Home() {
  const rows = 10
  const columns = 10
  const seededBoard: Cell[][] = generateBoard(rows, columns)
  return (
    <div className="game-container">
      <MineSweeper board={seededBoard} rows={rows} columns={columns}/>
    </div>
  );
}
