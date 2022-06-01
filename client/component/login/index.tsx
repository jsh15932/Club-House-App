import { useRouter } from "next/router";
import React, { FC, useContext, useState } from "react";
import { UserContext } from "../../layout/base.wrapper";
import Avatar from "../avatar";
import style from './login.module.scss';

interface IState {
    popup: boolean;
}

const Login: FC = () => {
    const router = useRouter();
    const userContext = useContext(UserContext);
    const [state, setState] = useState<IState>({
        popup: false
    });

    const loginClick = (e: React.MouseEvent<HTMLElement>): void => {
        if(!Object.keys(userContext).length) setState({...state, popup: state.popup ? false : true})
        if(userContext?.id) router.push('/profile');
    }

    return(
        <>
        <div onClick={loginClick} className={`flex align-center pointer`}>
            <span className={style.login__span}>{`${userContext?.id ? userContext.username : 'Login'}`}</span>
            <Avatar url={userContext && userContext?.avatar ? userContext.avatar : ''}/>
        </div>
        {state.popup && <PopupLogin callback={() => {setState({...state, popup: false})}}/>}
        </>
    );
}

export default Login;
