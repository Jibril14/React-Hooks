import React, { useState, useEffect } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
    const [userIngredients, setUserIngredient] = useState([]);

    const addIngredientHandler = (ingredient) => {
        setUserIngredient([{ id: Math.random(), ...ingredient }]);
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
    return (
        <div className="App">
            <IngredientForm onAddIngredient={addIngredientHandler} />

            <section>
                <Search />
                <IngredientList
                    ingredients={userIngredients}
                    onRemoveItem={() => {}}
                />
                {/* Need to add list here! */}
            </section>
        </div>
    );
}

export default Ingredients;
