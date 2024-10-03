function generateBoard(rows: number, columns: number): Cell[][] {
  return Array(rows).fill(null).map(() => {
    return Array(columns).fill(null).map(() => {
      return { state: "hidden", value: Math.random() > 0.8 ? "💣" : 0}
    })
  })
}

export { generateBoard }
