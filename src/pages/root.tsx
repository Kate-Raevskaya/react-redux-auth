import React from "react";
import {Navbar} from "../app/navbar";
import {Outlet} from "react-router-dom";
import {Footer} from "../app/footer";

export const Root = (): React.ReactElement => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}