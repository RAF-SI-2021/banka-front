import { get, post, put } from "./api";

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

export function finalizeAgreement(id) {
    let url = new URL(`${BASE_URL}/finalize/${id}`);
    return post(url);
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