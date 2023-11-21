import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Button from "@mui/material/Button";
import { TableCell, TableRow, TextField } from "@mui/material";

const CREATE_COLOR = gql`
    mutation Mutation($input: CreateColorInput!) {
        createColor(input: $input)
    }
`;

const isColorCode = (text1: string, text2: string, text3: string) => {
    const reg = /([01]?[0-9][0-9]?|2[0-4][0-9]|25[0-5])/;
    return reg.test(text1) && reg.test(text2) && reg.test(text3);
};

const ColorInput = () => {
    const [newName, setNewName] = useState<null | string>(null);
    const [newRed, setNewRed] = useState<null | string>(null);
    const [newGreen, setNewGreen] = useState<null | string>(null);
    const [newBlue, setNewBlue] = useState<null | string>(null);
    const [createColor, { loading, error }] = useMutation(CREATE_COLOR);
    if (loading) return <p>Loading</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <TableRow>
            <TableCell>
                <TextField
                    variant="standard"
                    value={newName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setNewName(e.target.value);
                    }}
                    sx={{ input: { color: "white" } }}
                />
            </TableCell>
            <TableCell>
                <TextField
                    variant="standard"
                    value={newRed}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setNewRed(e.target.value);
                    }}
                    sx={{ input: { color: "white" } }}
                />
            </TableCell>
            <TableCell>
                <TextField
                    variant="standard"
                    value={newGreen}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setNewGreen(e.target.value);
                    }}
                    sx={{ input: { color: "white" } }}
                />
            </TableCell>
            <TableCell>
                <TextField
                    variant="standard"
                    value={newBlue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setNewBlue(e.target.value);
                    }}
                    sx={{ input: { color: "white" } }}
                />
            </TableCell>
            <TableCell>
                <Button
                    id="basic-button"
                    onClick={() => {
                        if (isColorCode(newRed!, newGreen!, newBlue!)) {
                            createColor({
                                variables: {
                                    input: {
                                        color: newName,
                                        colorCode: [
                                            parseInt(newRed!),
                                            parseInt(newGreen!),
                                            parseInt(newBlue!),
                                        ],
                                    },
                                },
                            });
                        } else {
                            alert("Invalid color code!");
                        }
                    }}
                >
                    Create
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default ColorInput;
