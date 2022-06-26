import {
    get,
    post,
    patch,
    delete_,
    postWithoutStringify,
    postWithoutTokenAndBody,
    postWithoutToken,
} from "./api";
import {authSaveToken, authGetToken} from "../auth";

const BASE_URL = process.env.REACT_APP_USER_API;

export async function loginAction(username, password, otp = null) {
    let url = new URL(BASE_URL + "/login");
    const body = {
        username: username,
        password: password,
        otp: otp,
    };
    const r = await post(url, body);
    authSaveToken(r);
    return r;
}

export function logoutAction() {
    localStorage.clear();
}

export function getUserApi() {
    let url = new URL(BASE_URL + "/user");
    return get(url);
}

export function getUsersAction() {
    let url = new URL(BASE_URL + "/users");
    return get(url);
}

export function generateSecret() {
    let url = new URL(BASE_URL + "/otp/generateSecret");
    return get(url);
}

// TODO replace this with getUserApi
export function getUserId() {
    const token = authGetToken();
    let url = new URL(BASE_URL + "/user/getId/" + token);
    return post(url);
}

export function editUserAction(form) {
    let url = new URL(BASE_URL + "/user");
    return patch(url, form);
}

export function editUserByIdAction(id, form) {
    let url = new URL(BASE_URL + "/user/edit/" + id);
    return post(url, form);
}

export function createUserAction(body) {
    let url = new URL(BASE_URL + "/user/create");
    return post(url, body);
}

export function deleteUserAction(id) {
    let url = new URL(BASE_URL + "/user/delete/" + id);
    return delete_(url);
}

export function enableUserAction(id) {
    let url = new URL(BASE_URL + "/user/enable/" + id);
    return post(url);
}

export function changePasswordApi(password) {
    let url = new URL(BASE_URL + `/user/change-password`);
    const body = {
        newPassword: password,
    };
    return post(url, body);
}

export function getQrCodeApi(secret) {
    let url = new URL(BASE_URL + "/otp/generateQrUri");
    const body = {
        label: "Banka",
        secret: secret,
    };
    return post(url, body);
}

export function setUserSecret(id, secret) {
    let url = new URL(BASE_URL + "/otp/set/" + id);
    return postWithoutStringify(url, secret);
}

export function postValidationCodeApi(otp, secret) {
    let url = new URL(BASE_URL + "/otp/validate");
    const body = {
        otp: otp,
        secret: secret,
    };
    return post(url, body);
}

export function resetEmail(email) {
    let url = new URL(BASE_URL + "/user/reset-password");
    const body = {
        email: email,
    };
    return postWithoutToken(url, body);
}

export function changePasswordById(id, password) {
    let url = new URL(BASE_URL + "/user/new-password/" + id);
    const body = {
        newPassword: password,
    };
    return post(url, body);
}

export function changePasswordViaEmail(body) {
    let url = new URL(BASE_URL + "/user/change-password");
    return postWithoutToken(url, body);
}

export function hasTwoFactor(username) {
    let url = new URL(BASE_URL + "/otp/has/" + username);
    return postWithoutTokenAndBody(url);
}

export function resetLimitUser(id) {
    let url = new URL(BASE_URL + "/limit-reset/" + id);
    return patch(url, id);
}

//
// //export async function savePassAction(password1,password2, otp = null){
// //	let url = new URL(BASE_URL + "/login");
// //	let params = new URLSearchParams(url.search);
// //}
