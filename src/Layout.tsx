import type { PropsWithChildren } from "react";
import { NavLink } from "react-router";

export default function Layout(props: PropsWithChildren): React.JSX.Element {
    return (
        <div>
            <NavLink to="/"><button>Home</button>a</NavLink>
            <NavLink to="/menu"><button>Menu List</button>a</NavLink>
            <NavLink to="/menu/create"><button>Create Menu</button>a</NavLink>
            <br />
            <br />
            {props.children}
        </div>
    );
}