import { FC } from "react";
import Login from "../login";
import Logo from "../logo";
import style from "./nav.user.module.scss";

const NavUser: FC = () => {
    return (
        <div className={`flex align-center justify-space-between ${style.nav_user}`}>
            <Logo />
            <Login />
        </div>
    );
}

export default NavUser;