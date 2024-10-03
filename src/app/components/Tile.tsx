import { Cell } from "../types"

function Tile(props: Cell) {
  return (
    <div className={`cell ${props.state}`}>
      <span>{props.value ? props.value : null}</span>
    </div>
  )
}

export default Tile
