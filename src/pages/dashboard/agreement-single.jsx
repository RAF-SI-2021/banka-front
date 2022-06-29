import React, { useEffect, useState } from "react";
import Block from "../../components/common/Block";
import { useParams } from "react-router-dom";
import { editAgreement, finalizeAgreement, getAgreement, rejectAgreement } from "../../clients/agreementClient";
import TextField from "../../components/common/TextField";
import TextArea from "../../components/common/TextArea";
import PlaceholderLoading from 'react-placeholder-loading'
import Button from "../../components/common/Button";
import CreateAgreementPointModal from "../../components/company/CreateAgreementPointModal";
import Table from "../../components/common/Table";
import Notification from "../../components/common/Notification";

export default function AgreementSinglePage() {
    const params = useParams();
    const id = params['agreementId']
    const [agreement, setAgreement] = useState(null)
    const [modal, setModal] = useState(false)

    console.log(agreement)

    useEffect(() => {
        getAgreement(id).then(setAgreement)
    }, [])

    function canEdit() {
        if (!agreement) return false
        return agreement.status === "DRAFT";

    }

    async function handleEditAgreement() {
        try {
            await editAgreement(agreement).then(setAgreement)
            Notification("Uspesno ste izmenili ugovor.", "", "success")
        } catch (e) {
            Notification("Doslo je do greske", "Molimo pokusajte opet.", "danger")
        }
    }

    async function handleFinalizeAgreement() {
        try {
            await finalizeAgreement(agreement.id).then(setAgreement)
            Notification("Uspesno ste finalizirali ugovor.", "", "success")
        } catch (e) {
            Notification("Doslo je do greske", "Molimo pokusajte opet.", "danger")
        }
    }

    async function handleRejectAgreement() {
        try {
            await rejectAgreement(agreement.id).then(setAgreement)
            Notification("Uspesno ste odbacili ugovor.", "", "success")
        } catch (e) {
            Notification("Doslo je do greske", "Molimo pokusajte opet.", "danger")
        }
    }

    function renderContent() {
        if (!agreement) {
            return (
                <div className="grid grid-cols-2 gap-5">
                    <PlaceholderLoading shape="rect" width={'100%'} height={20}/>
                    <PlaceholderLoading shape="rect" width={'100%'} height={20}/>
                    <PlaceholderLoading shape="rect" width={'100%'} height={20}/>
                    <PlaceholderLoading shape="rect" width={'100%'} height={20}/>
                    <PlaceholderLoading shape="rect" width={'100%'} height={20}/>
                    <PlaceholderLoading shape="rect" width={'100%'} height={20}/>
                </div>
            )
        }

        return (
            <div className="grid gap-5">
                <div className="grid grid-cols-2 gap-5">
                    <TextField label="Status" value={agreement['status']} readOnly/>
                    <TextField label="Delovodni broj" value={agreement['delovodniBroj']} readOnly/>
                    <TextField label="Kreiran" value={agreement['created']} readOnly/>
                    <TextField label="Izmenjen" value={agreement['lastChanged']} readOnly/>
                </div>
                <TextArea
                    label="Opis"
                    readOnly={!canEdit()}
                    value={agreement['description']}
                    onChange={(e) => setAgreement({...agreement, description: e})}
                />
                {canEdit() &&
                    <div className="flex justify-end gap-5">
                        <Button label="Odbaci" design="danger" onClick={handleRejectAgreement}/>
                        <Button label="Azuriraj" design="secondary" onClick={handleEditAgreement}/>
                        <Button label="Finalizuj" onClick={handleFinalizeAgreement}/>
                    </div>}
            </div>
        )
    }

    function renderAgreementPointsCta() {
        if (!canEdit()) {
            return null
        }
        return (
            <Button label="Dodaj" design="secondary" onClick={() => setModal(true)}/>
        )
    }

    function handleAddPointSuccess() {
        getAgreement(agreement.id).then(setAgreement)
        setModal(false)
    }

    function createTableRows() {
        const rows = []
        if (!agreement || !agreement.stavke) return rows
        agreement.stavke.map(s => {
            rows.push([
                s['id'],
                s['kapitalTypePotrazni'],
                s['kapitalPotrazniOznaka'],
                s['kapitalTypeDugovni'],
                s['kapitalDugovniOznaka'],
            ])
        })
        return rows;
    }

    return (
        <div className="grid gap-5">
            <Block title={`Ugovor ${id}`}>
                {renderContent()}
            </Block>
            <Block title="Stavke" cta={renderAgreementPointsCta()}>
                <Table
                    headings={['ID', 'Potrazni tip', 'Potrazni oznaka', 'Dugovni tip', 'Dugovni oznaka']}
                    rows={createTableRows()}
                />
            </Block>
            {modal && <CreateAgreementPointModal
                agreement={agreement}
                onClose={() => setModal(false)}
                onSuccess={handleAddPointSuccess}
            />}
        </div>
    )
}
