import { delete_, get, post, put } from "./api";

const BASE_URL = `${process.env.REACT_APP_ACCOUNTS_API}/ugovor`;

export function getAgreements() {
    let url = new URL(`${BASE_URL}/`);
    return get(url);
}

export function getAgreement(id) {
    let url = new URL(`${BASE_URL}/id/${id}`);
    return get(url);
}

export function editAgreement(agreement) {
    let url = new URL(`${BASE_URL}/`);
    return put(url, agreement);
}

export function finalizeAgreement(id, file) {
    const formData = new FormData();
    formData.append("file", file)
    let url = new URL(`${BASE_URL}/finalize/${id}`);
    const headers = {}
    return post(url, formData, false, headers);
}

export function rejectAgreement(id) {
    let url = new URL(`${BASE_URL}/reject/${id}`);
    return post(url);
}

export function getAgreementsForCompany(companyId) {
    let url = new URL(`${BASE_URL}/company/${companyId}`);
    return get(url);
}

export function createAgreement(agreement) {
    let url = new URL(`${BASE_URL}/`);
    return post(url, agreement);
}

export function createAgreementPoint(agreementPoint) {
    let url = new URL(`${BASE_URL}/stavka`);
    return post(url, agreementPoint);
}

export function editAgreementPoint(agreementPoint) {
    let url = new URL(`${BASE_URL}/stavka`);
    return put(url, agreementPoint);
}

export function deleteAgreementPoint(id) {
    let url = new URL(`${BASE_URL}/stavka/${id}`);
    return delete_(url);
}
