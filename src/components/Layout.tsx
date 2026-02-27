import { Button } from "@mui/material";
import type { PropsWithChildren } from "react";
import { NavLink } from "react-router";

export default function Layout(props: PropsWithChildren): React.JSX.Element {
    return (
        <div>
            <NavLink to="/"><Button variant="contained">Home</Button></NavLink>
            <NavLink to="/menu"><Button variant="contained">Menu List</Button></NavLink>
            <NavLink to="/menu/create"><Button variant="contained">Create Menu</Button></NavLink>
            <br />
            <br />
            {props.children}
        </div>
    );
}