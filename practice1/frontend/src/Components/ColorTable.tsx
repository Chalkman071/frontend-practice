import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import Row from "./Row";
import {colors} from "../types"
import { Table, TableRow, TableCell } from "@mui/material";
import ColorInput from "./ColorInput";


const GET_COLORS = gql`
    query {
        colors {
            color
            colorCode
        }
    }
`;

const ColorTable: React.FC = () => {
    const { loading, error, data } = useQuery<colors>(GET_COLORS,{pollInterval: 200});
    if (loading) return <p>Loading</p>;
    if (error) return <p>Error: {error.message}</p>

    return (
        <Table>
            <TableRow>
                <TableCell>Color</TableCell>
                <TableCell>R</TableCell>
                <TableCell>G</TableCell>
                <TableCell>B</TableCell>
            </TableRow>
            {data?.colors.map(color => <Row color={color}/>)}
            <ColorInput/>
        </Table>
    )
}

export default ColorTable;