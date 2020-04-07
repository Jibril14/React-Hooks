import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
    const [enteredSearch, setEnteredSearch] = useState([]);
    const { onloadIngs } = props;
    useEffect(() => {
        const query =
            enteredSearch.length === 0
                ? ""
                : `?orderBy="title"&equalTo="${enteredSearch}`;
        fetch("http://store.com/api/ingredient/ingredient.json" + query)
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

                onloadIngs(ingredientFromDb);
            })
            .catch((error) => {});
    }, [enteredSearch, onloadIngs]);
    return (
        <section className="search">
            <Card>
                <div className="search-input">
                    <label>Filter by Title</label>
                    <input
                        type="text"
                        value={enteredSearch}
                        onChange={(event) =>
                            setEnteredSearch(event.target.value)
                        }
                    />
                </div>
            </Card>
        </section>
    );
});

export default Search;
