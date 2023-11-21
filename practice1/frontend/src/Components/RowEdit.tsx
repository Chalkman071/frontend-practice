import React, { useState } from "react";
import { TableCell, Button, TextField } from "@mui/material";
import { Color } from "../types";
import { gql, useMutation } from "@apollo/client";

const EDIT_COLOR = gql`
    mutation Mutation($updateColorInput2: UpdateColorInput!) {
        updateColor(input: $updateColorInput2)
    }
`;

const isColorCode = (text1: string, text2: string, text3: string) => {
    const reg = /([01]?[0-9][0-9]?|2[0-4][0-9]|25[0-5])/;
    return reg.test(text1) && reg.test(text2) && reg.test(text3);
};

const RowEdit: React.FC<{
    color: Color;
    setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ color, setEditing }) => {
    const [editColor, { loading, error }] = useMutation(EDIT_COLOR);
    const [red, setRed] = useState<string>(color.colorCode[0].toString());
    const [green, setGreen] = useState<string>(color.colorCode[1].toString());
    const [blue, setBlue] = useState<string>(color.colorCode[2].toString());

    if (loading) return <p>Loading</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <TableCell>
                <TextField
                    value={red}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setRed(e.target.value);
                    }}
                    sx={{ input: { color: "white" } }}
                />
            </TableCell>
            <TableCell>
                <TextField
                    value={green}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setGreen(e.target.value);
                    }}
                    sx={{ input: { color: "white" } }}
                />
            </TableCell>
            <TableCell>
                <TextField
                    value={blue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setBlue(e.target.value);
                    }}
                    sx={{ input: { color: "white" } }}
                />
            </TableCell>
            <TableCell>
                <Button
                    variant="text"
                    color="primary"
                    onClick={() => {
                        if (isColorCode(red, green, blue)) {
                            editColor({
                                variables: {
                                    updateColorInput2: {
                                        color: color.color,
                                        colorCode: [
                                            parseInt(red!),
                                            parseInt(green!),
                                            parseInt(blue!),
                                        ],
                                    },
                                },
                            });
                            setEditing(false);
                        } else {
                            alert("Invalid color code!");
                        }
                    }}
                >
                    Confirm
                </Button>
                <Button
                    variant="text"
                    color="primary"
                    onClick={() => {
                        setEditing(false);
                    }}
                >
                    Discard
                </Button>
            </TableCell>
        </>
    );
};

export default RowEdit;
