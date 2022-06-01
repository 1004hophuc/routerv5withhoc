import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { GET_ALL_PROJECT_CATEGORY_SAGA } from '../../redux/constants/LoginBugsConstants';


function FormEditProject(props) {

    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory);
    console.log(arrProjectCategory)

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue


    } = props;

    const dispatch = useDispatch();
    // const submitForm = (e) => {
    //     e.preventDefault();
    //     alert('submit edit');
    // }

    // componentdidmount
    // Vì nút submit không nằm trên form edit mà nằm trên modal, cho nên phải gửi sự kiện này lên trên reducer để modal lấy về
    useEffect(() => {

        // Load gọi API project category
        dispatch({
            type: GET_ALL_PROJECT_CATEGORY_SAGA
        })

        // Load sự kiện submit lên drawer nút submit
        dispatch({ type: 'SET_SUBMIT_EDIT_PROJECT', submitFunction: handleSubmit });
    }, [])


    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }

    return (
        <form className="container-fuild" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-4">

                    <div className="form-group">
                        <p className="font-weight-bold">Project id</p>
                        <input value={values.id} disabled className="form-control" name="id" />
                    </div>


                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project name</p>
                        <input value={values.projectName} onChange={handleChange} className="form-control" name="projectName" />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project Category</p>
                        <select className="form-control" name="categoryId" value={values.categoryId}>
                            {arrProjectCategory?.map((item, index) => {
                                return <option value={item.id} key={index}>
                                    {item.projectCategoryName}
                                </option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p className="font-weight-bold">Description</p>
                        <Editor
                            name="description123"
                            initialValue={values.description}

                            value={values.description}

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
                </div>
            </div>
        </form >
    )
}

const createFormEditProject = withFormik({

    enableReinitialize: true, // Cho phép mỗi khi redux thay đổi thì nó set lại giá trị mới

    mapPropsToValues: (props) => {

        const { projectEdit } = props;
        return {
            id: projectEdit.id,
            projectName: projectEdit?.projectName,
            description: projectEdit.description,
            categoryId: projectEdit.categoryId
        }

    },
    validationSchema: Yup.object().shape({


    }),
    handleSubmit: (values, { props, setSubmitting }) => {

        props.dispatch({
            type: 'UPDATE_PROJECT_SAGA',
            projectUpdate: values
        })

    },
    displayName: 'EditProject',
})(FormEditProject);

const mapStateToProp = (state) => ({
    projectEdit: state.ProjectReducer.projectEdit
})

export default connect(mapStateToProp)(createFormEditProject)