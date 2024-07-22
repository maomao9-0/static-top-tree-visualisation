export default function EdgeWidget({ pos1, pos2, isBold, highlightLevel }) {
    let stroke = "#333", strokeDash = null, strokeOpacity = null;
    if (highlightLevel & 1) {
        stroke = "#ff8a27";
        strokeDash = "5, 5";
        strokeOpacity = 0.5;
    }
    if (highlightLevel & 2) {
        stroke = "#ff8a27";
        strokeOpacity = null;
        if (highlightLevel & 1) {
            strokeDash = "10, 5";
        }
    }
    return (
        <line x1={pos1.x} y1={pos1.y} x2={pos2.x} y2={pos2.y} stroke={stroke} strokeDasharray={strokeDash}
            strokeWidth={isBold ? 4 : 2} strokeOpacity={strokeOpacity} />
    )
}