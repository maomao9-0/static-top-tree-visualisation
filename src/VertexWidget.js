export default function VertexWidget({ cpos, r, id, shape, highlightLevel, onMouseEnter, onMouseOut, onClick, cursor }) {
    let vertexFill = "#eee", vertexStroke = "#333", textFill = "#333", strokeDash = null, fillOpacity = null;
    if (highlightLevel & 1) {
        vertexFill = "#eee";
        vertexStroke = "#ff8a27";
        textFill = "#ff8a27";
        strokeDash = "5"
        fillOpacity = 0.7;
    }
    if (highlightLevel & 2) {
        vertexFill = "#ff8a27";
        vertexStroke = "#ff8a27";
        textFill = "#fff";
    }

    const textStyle = {
        cursor: cursor,
        userSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none",
    }

    const consumeOnClick = (e) => { e.stopPropagation(); onClick() };
    if (shape === "circle") {
        return (
            <>
                <circle cx={cpos.x} cy={cpos.y} r={r} fill="#fff" stroke="#fff" strokeWidth="2" />
                <circle cx={cpos.x} cy={cpos.y} r={r} fill={vertexFill} stroke={vertexStroke} strokeDasharray={strokeDash} fillOpacity={fillOpacity}
                    strokeWidth="2" onMouseEnter={onMouseEnter} onMouseOut={onMouseOut} onClick={consumeOnClick}
                    style={{ cursor: cursor }} />
                <text x={cpos.x} y={cpos.y} fill={textFill}
                    fontFamily="'PT Sans', sans-serif" fontSize="14" dy=".35em"
                    fontWeight="bold" textAnchor="middle" style={textStyle}
                    onMouseEnter={onMouseEnter} onMouseOut={onMouseOut} onClick={consumeOnClick}>{id}</text>
            </>
        )
    } else if (shape === "square") {
        return (
            <>
                <rect x={cpos.x - r} y={cpos.y - r} fill="#fff" stroke="#fff" strokeWidth="2" height={r * 2} width={r * 2} />
                <rect x={cpos.x - r} y={cpos.y - r} fill={vertexFill} stroke={vertexStroke} strokeDasharray={strokeDash} fillOpacity={fillOpacity}
                    strokeWidth="2" height={r * 2} width={r * 2} onMouseEnter={onMouseEnter} onMouseOut={onMouseOut} onClick={consumeOnClick}
                    style={{ cursor: cursor }} />
                <text x={cpos.x} y={cpos.y} fill={textFill}
                    fontFamily="'PT Sans', sans-serif" fontSize="14" dy=".35em"
                    fontWeight="bold" textAnchor="middle" style={textStyle}
                    onMouseEnter={onMouseEnter} onMouseOut={onMouseOut} onClick={consumeOnClick} >{id}</text>
            </>
        )
    } else {
        throw Error("Shape not found");
    }
}