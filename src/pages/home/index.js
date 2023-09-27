import React from "react";
import {
    Helmet,
    HelmetProvider
} from "react-helmet-async";
// import { Link } from "react-router-dom";

export const Home = () => {
    return(
        <HelmetProvider>
            <Helmet>
                <meta charset="utf-8" />
                <title>Home Page!</title>

            </Helmet>
            <h1>Home Page!</h1>
        </HelmetProvider>
    );
}