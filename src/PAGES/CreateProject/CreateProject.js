import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect, useSelector, useDispatch } from 'react-redux';
import { CREATE_NEW_PROJECT_SAGA, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../redux/constants/LoginBugsConstants';


function CreateProject(props) {

    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
    const dispatch = useDispatch();
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue


    } = props;


    useEffect(() => {
        //Gọi api để lấy dữ liệu thẻ select
        dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA })
    }, []);

    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }


    return (
        <div className="container m-5">
            <h3>CreateProject</h3>
            <form className="container" onSubmit={handleSubmit} onChange={handleChange}>
                <div className="form-group">
                    <p>Name</p>
                    <input onChange={handleChange} className="form-control" name="projectName" />
                </div>
                <div className="form-group">
                    <p>Description</p>
                    <Editor

                        name="description"

                        init={{
                            selector: 'textarea#myTextArea',

                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={handleEditorChange}
                    />
                </div>
                <div className="form-group">
                    <select onChange={handleChange} name="categoryId" className="form-control">
                        {arrProjectCategory.map((item, index) => {
                            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                        })}
                    </select>
                </div>
                <button className="btn btn-outline-primary" type="submit">Create project</button>
            </form>
        </div>
    )
}




const createProjectForm = withFormik({

    enableReinitialize: true, // Cho phép mỗi khi redux thay đổi thì nó set lại giá trị mới

    mapPropsToValues: (props) => ({ //props này chứa nhiều thứ như history, ... từ redux, chứa luôn những giá trị được lấy về từ props (ở đây là mảng)
        projectName: '',
        description: '',
        categoryId: props.arrProjectCategory[0]?.id
        // Vì ban đầu array không có dữ liệu nên nó sẽ báo lỗi, render ra nó mới có dữ liệu cho array
        // Sau khi sử dụng toán tử Optional changing thì nó sẽ mang giá trị undefined, bởi vì khi nó render ra nó chỉ lấy giá trị lần đầu trên store(lần đầu là arr rỗng), nó chỉ lấy giá trị lần đầu của mapStateToProp, còn lần sau redux thay đổi thì nó không set lại. Do đó phải sự dụng prop enableReinitialize
        //Còn đối với desciption thì phải dùng setFieldValue của formik để nó có thể set lại giá trị
    }),
    validationSchema: Yup.object().shape({


    }),
    handleSubmit: (values, { props, setSubmitting }) => {

        props.dispatch({
            type: CREATE_NEW_PROJECT_SAGA,
            newProject: values
        })

    },
    displayName: 'CreateProjectFormik',
})(CreateProject);

const mapStateToProp = (state) => {
    return {
        arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory
    }
}


export default connect(mapStateToProp)(createProjectForm);