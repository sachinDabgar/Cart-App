import React, { useState } from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";

interface Product {
    id: number;
    name: string;
    count: number;
}

function Cart() {
    const initialProducts: Product[] = [
        { id: 1, name: "Product 1", count: 0 },
        { id: 2, name: "Product 2", count: 0 },
        { id: 3, name: "Product 3", count: 0 },
        { id: 4, name: "Product 4", count: 0 },
        { id: 5, name: "Product 5", count: 0 },
    ];

    const [cartItems, setCartItems] = useState<Product[]>(initialProducts);
    const [warning, setWarning] = useState("");

    const handleAddItem = (productId: number) => {
        setCartItems((prevItems) => {
            const updatedItems = [...prevItems];
            const index = updatedItems.findIndex(
                (item) => item.id === productId
            );
            updatedItems[index] = {
                ...updatedItems[index],
                count: updatedItems[index].count + 1,
            };
            return updatedItems;
        });
    };

    const handleRemoveItem = (productId: number) => {
        setCartItems((prevItems) => {
            const updatedItems = [...prevItems];
            const index = updatedItems.findIndex(
                (item) => item.id === productId
            );
            if (updatedItems[index].count > 0) {
                updatedItems[index] = {
                    ...updatedItems[index],
                    count: updatedItems[index].count - 1,
                };
            } else {
                setWarning("add items to reduce");
            }
            return updatedItems;
        });
    };

    const handleDeleteItem = (productId: number) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId)
        );
    };

    const handleRefresh = () => {
        setCartItems(initialProducts);
    };

    return (
        <div className="App">
            <header className="App-header">
                <Typography variant="h5">Simple Cart App</Typography>
                <Typography
                    data-testid="total-items"
                    variant="subtitle1"
                >
                    Total Items:
                    {cartItems.reduce((total, item) => total + item.count, 0)}
                </Typography>

                {warning && (
                    <Typography
                        data-testid="warning"
                        variant="body1"
                    >
                        {warning}
                    </Typography>
                )}

                {cartItems.map((item) => (
                    <Card key={item.id}>
                        <CardContent>
                            <Typography variant="body1">{item.name}</Typography>
                        </CardContent>
                        <CardActions>
                            <Typography
                                bgcolor={"lightblue"}
                                mx={2}
                                p={1}
                                variant="body2"
                            >
                                {item.count}
                            </Typography>
                            <Button
                                data-testid="add-btn"
                                variant="contained"
                                color="primary"
                                onClick={() => handleAddItem(item.id)}
                            >
                                +
                            </Button>
                            <Button
                                data-testid="remove-btn"
                                variant="contained"
                                color="secondary"
                                onClick={() => handleRemoveItem(item.id)}
                            >
                                -
                            </Button>
                            <Button
                                data-testid="delete-btn"
                                variant="outlined"
                                color="error"
                                onClick={() => handleDeleteItem(item.id)}
                            >
                                Delete
                            </Button>
                        </CardActions>
                    </Card>
                ))}

                <Stack
                    direction={"row"}
                    mt={2}
                    spacing={2}
                >
                    <Button
                        data-testid="refresh-btn"
                        variant="outlined"
                        color="inherit"
                        onClick={handleRefresh}
                    >
                        Refresh
                    </Button>
                    <Button
                        data-testid="recycle-btn"
                        variant="outlined"
                        color="inherit"
                        onClick={() => setCartItems([])}
                    >
                        Recycle
                    </Button>
                </Stack>
            </header>
        </div>
    );
}

export default Cart;
