import React, { useState } from "react";

const AuthContext = React.createContext({
    isAuth: false,
    login: () => {}
});

function AuthContextProvider(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loginHandler = () => {
        setIsAuthenticated(true);
    };

    return (
        <AuthContext.Provider
            value={{ login: loginHandler, isAuth: isAuthenticated }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthContextProvider };
