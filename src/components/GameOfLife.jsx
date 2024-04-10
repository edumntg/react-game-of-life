import { useState } from "react"
import { Grid } from "./Grid"
import { World } from "../objects/World";
import "../styles/gameoflife.css";
export function GameOfLife({world, setWorld, running, setRunning}) {
    const step = () => {
        if(!running) {
          return;
        }
        world.step();
    
        const newWorld = World.fromWorld(world);
        setWorld(newWorld);
    }
    
    const start = () => {
        step();
        if(running) {
          setTimeout(() => {
            start();
          }, 200);
        }
    }
    
    return (
        <>
            <button onClick={() => {
                setRunning(!running);
                start();
            }}>{running ? 'Stop' : 'Start'}</button>
            <div className="gol">
                {/* <div className="steps-performed">{world.stepsPerformed}</div> */}
                <Grid world={world} setWorld={setWorld}/>
            </div>
            {/* <div className="board">
                {[...Array(16).keys()].map(x => <div className="square"/>)}
            </div> */}
        </>
    )
}