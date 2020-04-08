import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
    const [enteredSearch, setEnteredSearch] = useState([]);
    const { onloadIngs } = props;

    const inputRef = useRef();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (enteredSearch === inputRef.current.value) {
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
            }
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [enteredSearch, onloadIngs]);

    return (
        <section className="search">
            <Card>
                <div className="search-input">
                    <label>Filter by Title</label>
                    <input
                        ref={inputRef}
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
