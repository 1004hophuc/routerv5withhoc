import axios from 'axios'
import { DOMAIN_BUGS, TOKEN } from "../util/constants/settingsystems";

export const LoginService = {
    dangNhap: (userLogin) => {
        return new axios({
            url: `${DOMAIN_BUGS}/users/signin`,
            method: 'POST',
            data: userLogin
        })
    },
    getAllProjectCategory: () => {
        return new axios({
            url: `${DOMAIN_BUGS}/ProjectCategory`,
            method: 'GET'
        })
    },
    createNewProject: (newProject) => {
        return new axios({
            url: `${DOMAIN_BUGS}/Project/createProject`,
            method: 'POST',
            data: newProject
        })
    },
    createNewProjectAuthorization: (newProject) => {
        // console.log(localStorage.getItem(TOKEN))
        return new axios({
            url: `${DOMAIN_BUGS}/Project/createProjectAuthorize`,
            method: 'POST',
            data: newProject,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    getAllListProject: () => {
        // console.log(localStorage.getItem(TOKEN))
        return new axios({
            url: `${DOMAIN_BUGS}/Project/getAllProject`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    updateProject: (projectUpdate) => {
        // console.log(localStorage.getItem(TOKEN))
        return new axios({
            url: `${DOMAIN_BUGS}/Project/updateProject?projectId=${projectUpdate.id}`,
            method: 'PUT',
            data: projectUpdate,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    deleteProject: (id) => {
        // console.log(localStorage.getItem(TOKEN))
        return new axios({
            url: `${DOMAIN_BUGS}/Project/deleteProject?projectId=${id}`,
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
}