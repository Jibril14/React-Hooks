import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";

function Ingredients() {
    const [userIngredients, setUserIngredient] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const addIngredientHandler = (ingredient) => {
        // setUserIngredient([{ id: Math.random(), ...ingredient }]);
        setUserIngredient([{ id: 1, ...ingredient }]);
    };

    /**
    // Using useEffect to fetch data from database
    // Set Our state from Db data rather than manually from another's input element Component
    useEffect(() => {
        fetch("api/ingredient/get")
            .then((response) => response.json())
            .then((responseData) => {
                const ingredientFromDb = [];
                for (const ing in responseData) {
                    ingredientFromDb.push({
                        id: ing,
                        title: responseData[ing].title,
                        amount: responseData[ing].amount
                    });
                }
                setUserIngredient(ingredientFromDb);
            });
    }, []);
**/

    const filteredIngHandler = useCallback((filteredIngredient) => {
        setUserIngredient(filteredIngredient);
    }, []);

    const removeIngHandler = (ingId) => {
        setIsLoading(true);
        fetch(`https://store.com/api/ingredient/ingredient/${ingId}.json`, {
            method: "DELETE"
            // At the time you might be using this, pls note that the api
            // might not be responsive
        })
            .then((response) => {
                setIsLoading(false);
                setUserIngredient([
                    (previousIng) => {
                        previousIng.filter(
                            (ingredient) => ingredient.id !== ingId
                        );
                    }
                ]);
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const closeError = () => {
        setError(null);
        setIsLoading(false);
    };

    return (
        <div className="App">
            <IngredientForm
                onAddIngredient={addIngredientHandler}
                loading={isLoading}
            />

            <section>
                <Search onloadIngs={filteredIngHandler} />
                <IngredientList
                    ingredients={userIngredients}
                    onRemoveItem={removeIngHandler}
                />
            </section>
            {error ? (
                <ErrorModal onClose={closeError}>{error}</ErrorModal>
            ) : null}
        </div>
    );
}

export default Ingredients;
