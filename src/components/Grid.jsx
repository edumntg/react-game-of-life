import "../styles/grid.css"
import { Tile } from "./Tile";
import React, {useEffect, useRef} from "react";
export function Grid({world}) {

    const boardRef = useRef(null);

    //const world = new World(size, numOfCells);

    useEffect(() => {
        boardRef.current.style.setProperty("--grid-size", world?.size);
        boardRef.current.style.setProperty("width", world?.size/5);
        boardRef.current.style.setProperty("height", world?.size/5);
    }, [world?.size]);

    function constructGrid(world) {
        let grid = [];
        for(let i = 0; i < world?.size; i++) {
            let row = [];
            for(let j = 0; j < world?.size; j++) {
                row.push(world.hasCell(i, j) ? world.get(i,j) : -1);
            }
            grid.push(row);
        }

        return grid;
    }

    return (
        <>
            {/* <div className="grid">
                {constructGrid(world).map((row, i) => (
                    <div className={`grid-row idx-${i}`}>
                        {row.map((cell, j) => (
                            <Tile cell={cell}/>
                        ))}
                    </div>
                ))}
            </div> */}

            <div className="grid-container">
                <div ref={boardRef} className="board">
                    {constructGrid(world).map((row, i) => (
                        row.map((cell, j) => (
                            <Tile cell={cell}/>
                        ))
                    ))}
                </div>
                
            </div>


        </>
        
    )
}