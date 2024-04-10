import { useState } from "react"
import { Grid } from "./Grid"
import { World } from "../objects/World";
import "../styles/gameoflife.css";

export function GameOfLife({size, numOfCells}) {

    const [world, setWorld] = useState(new World(size,numOfCells));

    function step() {
        world.step();
        setWorld(world);
    }

    return (
        <>
            <div>
                <div className="steps-performed">{world.stepsPerformed}</div>
                <button onClick={step}>Step</button>
                <Grid world={world}/>
            </div>
            {/* <div className="board">
                {[...Array(16).keys()].map(x => <div className="square"/>)}
            </div> */}
        </>
    )
}