import React from 'react';
import { useSelector } from 'react-redux'

export default function Home(props) {

    const infoUserInLocal = useSelector(state => state.StoreUserInLocalReducer.userLogin);

    return (
        <div>
            {infoUserInLocal.name}
            <img alt="img" src={infoUserInLocal.avatar} />
        </div>
    )
}
