import React from "react";
import { TableCell, Button } from "@mui/material";
import { Color } from "../types";
import { gql, useMutation } from "@apollo/client";

const DELETE_COLOR = gql`
    mutation DeleteColor($input: DeleteColorInput!) {
        deleteColor(input: $input)
    }
`;

const RowDisplay: React.FC<{
    color: Color;
    setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ color, setEditing }) => {
    const [deleteColor, { loading, error }] = useMutation(DELETE_COLOR);

    if (loading) return <p>Loading</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            {color.colorCode.map((e) => (
                <TableCell>{e}</TableCell>
            ))}
            <TableCell>
                <Button
                    variant="text"
                    color="primary"
                    onClick={() => {
                        deleteColor({
                            variables: {
                                input: { color: color.color },
                            },
                        });
                    }}
                >
                    Delete
                </Button>
                <Button
                    variant="text"
                    color="primary"
                    onClick={() => {
                        console.log("sus");
                        setEditing(true);
                    }}
                >
                    Edit
                </Button>
            </TableCell>
        </>
    );
};

export default RowDisplay;
