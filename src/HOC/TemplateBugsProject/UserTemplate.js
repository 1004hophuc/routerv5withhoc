import { Route } from "react-router";
import React from "react";
import { Button, Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;


export const UserTemplate = (props) => {

    const { Component, ...resParam } = props;

    return <Route {...resParam} render={(propRoutes) => {
        return <>
            <Layout>
                <Sider width={window.innerWidth / 2} style={{ height: window.innerHeight, backgroundImage: 'url(https://picsum.photos/2000)', backgroundSize: '100%' }}>

                </Sider>
                <Content>
                    <Component />
                </Content>
            </Layout>

        </>
    }} >

    </Route>
}