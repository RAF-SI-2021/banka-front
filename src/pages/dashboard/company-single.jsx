import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompanyInformation from "../../components/company/CompanyInformation";
import CompanyAgreements from "../../components/company/CompanyAgreements";
import CompanyContact from "../../components/company/CompanyContact";
import { getCompany } from "../../clients/companyClient";
import CompanyBankAccounts from "../../components/company/CompanyBankAccounts";

export default function CompanySinglePage() {
    const params = useParams()
    const [company, setCompany] = useState(null)

    useEffect(() => {
        if (!params) return;
        fetchData(params['companyName'])
    }, [])

    function fetchData(name) {
        getCompany(name).then((e) => setCompany(e[0]))
    }


    return (
        <div className='grid gap-5 mb-20'>
            <CompanyInformation company={company} onEdit={fetchData}/>
            <CompanyBankAccounts company={company}/>
            <CompanyAgreements company={company}/>
            <CompanyContact company={company}/>
        </div>
    )
}