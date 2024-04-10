import "../styles/grid.css"
import { Tile } from "./Tile";
export function Grid({world}) {

    return (
        <>
            <div className="grid">
                {world.grid.map((row, i) => (
                    <div className={`grid-row idx-${i}`}>
                        {row.map((cell, j) => (
                            <Tile cell={cell}/>
                        ))}
                    </div>
                ))}
            </div>

        </>
        
    )
}