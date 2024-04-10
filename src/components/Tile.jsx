import { Cell } from "./Cell";
import "../styles/tile.css";

export function Tile({cell})  {
    return (
        <><div className="tile">{cell != -1 ? <Cell x={cell.x} y={cell.y} alive={cell.alive}/> : ''}</div></>
    )
}