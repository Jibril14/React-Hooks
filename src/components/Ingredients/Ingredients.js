import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
    const [userIngredients, setUserIngredient] = useState([]);
    const addIngredientHandler = (ingredient) => {
        setUserIngredient([{ id: Math.random(), ...ingredient }]);
    };

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
