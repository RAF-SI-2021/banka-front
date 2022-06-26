import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompanyInformation from "../../components/company/CompanyInformation";
import CompanyAgreements from "../../components/company/CompanyAgreements";
import CompanyAccounts from "../../components/company/CompanyAccounts";
import CompanyContact from "../../components/company/CompanyContact";
import { getCompany } from "../../clients/companyClient";

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
            <CompanyInformation company={company}/>
            <CompanyAccounts/>
            <CompanyAgreements/>
            <CompanyContact company={company}/>
        </div>
    )
}