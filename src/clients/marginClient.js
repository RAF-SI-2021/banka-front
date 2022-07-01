import { delete_, get, post } from "./api";

const BASE_URL = `${process.env.REACT_APP_ACCOUNTS_API}/margin/`;

export function getMarginState() {
    let url = new URL(`${BASE_URL}stanje`);
    return get(url);
}

export function createTransaction(amount) {
    const body = {
        tipTransakcije: (parseInt(amount) < 0) ? "UPLATA" : "ISPLATA",
        iznos: Math.abs(parseInt(amount)),
        opis: "uplata/isplata",
        kredit: 0,
        maintenanceMargin: 0,
        tipKapitala: "MARGIN",
        kolicina: 0,
        unitPrice: 0,
    }
    let url = new URL(`${BASE_URL}transakcija`);
    return post(url, body);
}

export function getMarginTransactions() {
    let url = new URL(`${BASE_URL}transakcije`);
    return get(url);
}

export function getMarginCapital() {
    let url = new URL(`${BASE_URL}kapitalStanje`);
    return get(url);
}

export function getMarginCapitalForType(type) {
    let url = new URL(`${BASE_URL}kapitalStanje/${type}`);
    return get(url);
}
