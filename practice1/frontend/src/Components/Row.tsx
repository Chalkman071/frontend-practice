import React, { useState } from "react";
import { Color } from "../types";
import { TableCell, TableRow } from "@mui/material";
import RowDisplay from "./RowDisplay";
import RowEdit from "./RowEdit";

const Row: React.FC<{ color: Color }> = ({ color }) => {
    const [editing, setEditing] = useState(false);
    return (
        <TableRow>
            <TableCell>{color.color}</TableCell>

            {!editing ? (
                <RowDisplay color={color} setEditing={setEditing} />
            ) : (
                <RowEdit color={color} setEditing={setEditing} />
            )}
        </TableRow>
    );
};

export default Row;
