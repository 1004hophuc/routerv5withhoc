import React, { useState } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_DRAWER_MODAL, OPEN_DRAWER_MODAL } from '../../redux/constants/LoginBugsConstants';



export default function ModalBugsEditCreateProject(props) {



    const { visible, ComponentEditCreateProject, callBackSubmit } = useSelector(state => state.ModalBugsEditCreateProjectReducer);

    const dispatch = useDispatch();

    console.log('visible', visible)


    const showDrawer = () => {
        dispatch({ type: OPEN_DRAWER_MODAL });
    };

    const onClose = () => {
        dispatch({ type: CLOSE_DRAWER_MODAL });

    };
    return (
        <>
            {/* <button onClick={showDrawer}>showdrawer</button> */}
            <Drawer
                title="Create a new account"
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}

                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button onClick={callBackSubmit} type="primary">
                            Submit
                        </Button>
                    </div>
                }
            >
                {/* Nội dung thay đổi của drawer */}
                {ComponentEditCreateProject}

            </Drawer>
        </>
    )
}