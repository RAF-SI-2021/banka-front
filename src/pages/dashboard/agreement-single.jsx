import React, { useEffect, useState } from "react";
import Block from "../../components/common/Block";
import { useParams } from "react-router-dom";
import { editAgreement, getAgreement, rejectAgreement } from "../../clients/agreementClient";
import TextField from "../../components/common/TextField";
import TextArea from "../../components/common/TextArea";
import PlaceholderLoading from 'react-placeholder-loading'
import Button from "../../components/common/Button";
import AgreementPointModal from "../../components/company/AgreementPointModal";
import Table from "../../components/common/Table";
import Notification from "../../components/common/Notification";
import FinalizeAgreementModal from "../../components/FinalizeAgreementModal";

export default function AgreementSinglePage() {
    const params = useParams();
    const id = params['agreementId']
    const [agreement, setAgreement] = useState(null)
    const [selectedPoint, setSelectedPoint] = useState(null)
    const [modal, setModal] = useState(false)
    const [finalizeModal, setFinalizeModal] = useState(false)

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
                        <Button label="Finalizuj" onClick={() => setFinalizeModal(true)}/>
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

    function handleSuccess() {
        getAgreement(agreement.id).then(setAgreement)
        setSelectedPoint(null)
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

    function handleSelectPoint(e) {
        const found = agreement.stavke.find(s => {
            return s['id'] === e[0]
        })
        setSelectedPoint(found)
        setModal(true)
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
                    onClick={handleSelectPoint}
                    clickable
                />
            </Block>
            {modal && <AgreementPointModal
                agreement={agreement}
                point={selectedPoint}
                onClose={() => setModal(false)}
                onSuccess={handleSuccess}
            />}
            {finalizeModal &&
                <FinalizeAgreementModal
                    agreement={agreement}
                    onSuccess={setAgreement}
                    onClose={() => setFinalizeModal(false)}
                />}
        </div>
    )
}
