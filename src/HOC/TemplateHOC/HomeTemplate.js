import React from 'react'
import { Fragment } from 'react';
import { Route } from 'react-router'
import Header from '../../GLOBAL/Header/Header';

export const HomeTemplate = (props) => {

    // Bóc tách componet
    const { Component, ...restParam } = props;

    return <Route {...restParam} render={(propsRoute) => {
        return <Fragment>
            <Header />
            <Component {...propsRoute} />
        </Fragment>
    }} />
}
// or <Route {...restParam} render={(propsRoute)

// <Route path={restParam.path} render={(propsRoute)

// HomeTemplate là 1 function trả về cho mình 1 thẻ Route, mà để trả về thẻ Route thì nó phải nhận vào props là 1 component
