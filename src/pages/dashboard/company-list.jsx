import React, { useEffect, useState } from "react";
import { getCompanies } from "../../clients/companyClient";
import Block from "../../components/common/Block";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import CreateCompanyModal from "../../components/company/CreateCompanyModal";
import { Routes, useNavigate } from "react-router-dom";
import { URLS } from "../../routes";

export default function CompanyListPage() {
    const navigate = useNavigate()
    const [companies, setCompanies] = useState([])
    const [modal, setModal] = useState(false);

    useEffect(() => {
        fetchData()
    }, [])

    function fetchData() {
        getCompanies().then(r => setCompanies(r))
    }

    function renderCta() {
        return (
            <Button label='Dodaj' design="secondary" onClick={() => setModal(true)}/>
        )
    }

    function handleCreateCompany() {
        setModal(false)
        fetchData()
    }

    function createTableRows() {
        const rows = []
        companies.map(c => {
            rows.push([
                c['id'],
                c['naziv'],
                c['pib'],
                c['sifraDelatnosti'],
                c['adresa'],
                c['drzava'],
            ])
        })
        return rows
    }

    function handleRowClick(e) {
        navigate(`/${URLS.DASHBOARD.COMPANY.LIST}/${e[1]}`)
    }

    return (
        <Block title="Kompanije" cta={renderCta()}>
            <Table
                headings={['ID', 'Naziv', 'PIB', 'Sifra', 'Adresa', 'Drzava']}
                rows={createTableRows()}
                onClick={handleRowClick}
                clickable
            />
            {modal && <CreateCompanyModal onClose={() => setModal(false)} onSuccess={handleCreateCompany}/>}
        </Block>
    )
}