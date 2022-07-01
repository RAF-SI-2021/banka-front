import { delete_, get, post } from "./api";

const BASE_URL = `${process.env.REACT_APP_ACCOUNTS_API}/company/`;

export function getCompanies() {
    let url = new URL(BASE_URL);
    return get(url);
}

export function getCompany(name) {
    let url = new URL(`${BASE_URL}naziv/${name}`);
    return get(url);
}

export function editCompany(company) {
    let url = new URL(`${BASE_URL}edit`);
    return post(url, company);
}

export function createCompany(company) {
    let url = new URL(BASE_URL);
    return post(url, company);
}

export function getCompanyContact(id) {
    let url = new URL(`${BASE_URL}contact/${id}`);
    return get(url);
}

export function createCompanyContact(contact) {
    let url = new URL(`${BASE_URL}contact`);
    return post(url, contact);
}

export function editCompanyContact(contact) {
    let url = new URL(`${BASE_URL}contact/edit`);
    return post(url, contact);
}

export function deleteCompanyContact(id) {
    let url = new URL(`${BASE_URL}contact/${id}`);
    return delete_(url);
}

export function getCompanyBankAccounts(id) {
    let url = new URL(`${BASE_URL}bankaccount/${id}`);
    return get(url);
}

export function createCompanyBankAccount(account) {
    let url = new URL(`${BASE_URL}bankaccount`);
    return post(url, account);
}

export function editCompanyBankAccount(account) {
    let url = new URL(`${BASE_URL}bankaccount/edit`);
    return post(url, account);
}

export function deleteCompanyBankAccount(id) {
    let url = new URL(`${BASE_URL}bankaccount/${id}`);
    return delete_(url);
}
