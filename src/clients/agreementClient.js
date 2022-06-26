import { get, post } from "./api";

const BASE_URL = `${process.env.REACT_APP_ACCOUNTS_API}/ugovor/`;

export function getAgreements() {
    let url = new URL(BASE_URL);
    return get(url);
}

export function getAgreementsForCompany(companyId) {
    let url = new URL(`${BASE_URL}company/${companyId}`);
    return get(url);
}

export function createAgreement(agreement) {
    let url = new URL(`${BASE_URL}`);
    return post(url, agreement);
}
