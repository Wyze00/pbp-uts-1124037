import type { PropsWithChildren } from "react";
import { NavLink } from "react-router";

export default function Layout(props: PropsWithChildren): React.JSX.Element {
    return (
        <div>
            <NavLink to="/"><button>Home</button></NavLink>
            <NavLink to="/menu"><button>Menu List</button></NavLink>
            <NavLink to="/menu/create"><button>Create Menu</button></NavLink>
            <br />
            <br />
            {props.children}
        </div>
    );
}