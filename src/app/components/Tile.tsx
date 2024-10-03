import { Cell } from "../types"

const Tile = ({ state, value }: Cell ) => {
  return (
    <div className={`cell ${state}`}>
      <span>{value ? value : null}</span>
    </div>
  )
}

export default Tile
