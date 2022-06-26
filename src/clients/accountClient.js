import {get} from "./api";

const BASE_URL = process.env.REACT_APP_ACCOUNTS_API;

export function getAccountCashStateSupervisor() {
    let url = new URL(BASE_URL + "/racun/stanjeSupervisor");
    return get(url);
}

export function getAccountCacheStateAgent() {
    let url = new URL(BASE_URL + "/racun/stanjeAgent");
    return get(url);
}

export function getAccountTransactions(currency) {
    let url = new URL(BASE_URL + "/racun/transakcije/" + currency);
    return get(url);
}
