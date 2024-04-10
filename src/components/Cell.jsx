import "../styles/cell.css"
export function Cell({x, y, alive}) {
    return (
        <div className={`cell-${alive ? 'alive' : 'dead'} ${x}-${y}`}></div>
    )
}