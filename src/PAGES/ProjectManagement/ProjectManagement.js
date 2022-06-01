import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Table, Tag, Space, Button } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import parse from 'html-react-parser';
import { GET_ALL_LIST_PROJECT_SAGA } from '../../redux/constants/LoginBugsConstants';
import FormEditProject from '../../COMPONENTS/Form/FormEditProject';

import { Popconfirm, message } from 'antd';

const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
}

export default function ProjectManagement(props) {

    const dispatch = useDispatch();

    const data = useSelector(state => state.GetAllProjectReducer.listProject);

    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });

    useEffect(() => {

        dispatch({
            type: GET_ALL_LIST_PROJECT_SAGA
        })
    }, [])

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    const clearFilters = () => {
        setState({ filteredInfo: null });
    };

    const clearAll = () => {
        setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    const setAgeSort = () => {
        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    };

    let { sortedInfo, filteredInfo } = state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            sorter: (item2, item1) => {
                if ((item2.id - item1.id) < 0) {
                    return -1;
                }
                return 1;
            },
            sortDirections: ['descend'],
        },
        {
            title: 'projectName',
            dataIndex: 'projectName',
            key: 'projectName',
            sorter: (item2, item1) => {
                // Ở đây js sẽ so sánh tên theo mã ASCII(có phân biệt hoa thường) nên là phải chuyển về thường + loại bỏ khoảng trống để tiện so sánh
                let tenSPThu2 = item2.projectName?.trim().toLowerCase();
                let tenSPDauTien = item1.projectName?.trim().toLowerCase();

                if (tenSPThu2 < tenSPDauTien) {
                    return -1;
                }
                return 1;
            }

        },
        // {
        //     title: 'description',
        //     dataIndex: 'description',
        //     key: 'description',
        //     render: (text, record, index) => {
        //         let contentJSX = parse(text);

        //         return <div>
        //             {contentJSX}
        //         </div>
        //     }
        // },

        {
            title: 'category',
            dataIndex: 'categoryName',
            key: 'categoryName',
            render: (text, record, index) => {
                return <Tag color="green">{record.categoryName}</Tag>
            },
            sorter: (item2, item1) => {
                // Ở đây js sẽ so sánh tên theo mã ASCII(có phân biệt hoa thường) nên là phải chuyển về thường + loại bỏ khoảng trống để tiện so sánh
                let tenSPThu2 = item2.categoryName?.trim().toLowerCase();
                let tenSPDauTien = item1.categoryName?.trim().toLowerCase();

                if (tenSPThu2 < tenSPDauTien) {
                    return -1;
                }
                return 1;
            }
        },

        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => {
                return <div>
                    <button onClick={() => {
                        dispatch({
                            type: 'OPEN_FORM_EDIT_PROJECT',
                            Component: <FormEditProject />
                        })
                    }} className="btn mr-2 btn-primary">
                        <FormOutlined onClick={() =>
                            dispatch({
                                type: 'TAKE_INFO_PROJECT_EDIT',
                                projectEdit: record
                            })
                        } style={{ fontSize: 17 }} />
                    </button>

                    <Popconfirm
                        title="Are you sure to delete this project?"
                        onConfirm={() =>
                            dispatch({
                                type: 'DELETE_PROJECT_SAGA',
                                projectId: record.id
                            })}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="btn btn-danger">
                            <DeleteOutlined style={{ fontSize: 17 }} />
                        </button>
                    </Popconfirm>

                </div>
            },
        }

    ];
    return (
        <div className="container-fluid mt-5">
            <h3>Project management</h3>
            <Space style={{ marginBottom: 16 }}>
                <Button onClick={setAgeSort}>Sort age</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table columns={columns} rowKey={"id"} dataSource={data} onChange={handleChange} />
        </div>
    )
}
