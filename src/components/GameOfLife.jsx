import { useState } from "react"
import { Grid } from "./Grid"
import { World } from "../objects/World";

export function GameOfLife({rows, columns, numOfCells}) {

    const [world, setWorld] = useState(new World(rows,columns,numOfCells));

    console.log(world)

    return (
        <div>
            <Grid world={world}/>
        </div>
    )
}