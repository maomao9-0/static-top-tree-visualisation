import { useState } from 'react';
import InputColumn from './InputColumn.js'
import { stringToTree } from './tree.js';
import Visualisation from './Visualisation.js';

export default function MainContainer() {
    const [rawInput, setRawInput] = useState("8\n3 1\n1 2\n4 5\n4 7\n6 4\n3 4\n8 5");
    let tree;
    try {
        tree = stringToTree(rawInput);
    } catch (err) {
        tree = null;
    }
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            padding: 16,
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
        }}>
            <InputColumn width={300} rawInput={rawInput} setRawInput={setRawInput} />
            <Visualisation tree={tree}></Visualisation>
        </div>
    );
}