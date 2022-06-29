import Modal from "./common/Modal";
import Files from "react-files";
import Button from "./common/Button";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { finalizeAgreement } from "../clients/agreementClient";
import Notification from "./common/Notification";

function FinalizeAgreementModal(props) {
    const [files, setFiles] = useState([])

    async function handleFinalizeAgreement() {
        try {
            const r = await finalizeAgreement(props.agreement.id, files[0])
            Notification("Uspesno ste finalizirali ugovor.", "", "success")
            props.onSuccess(r)
            props.onClose()
        } catch (e) {
            Notification("Doslo je do greske", "Molimo pokusajte opet.", "danger")
        }
    }

    return (
        <Modal onClose={props.onClose} id="finalize-modal" title="Finalizovanje ugovora">
            <Files
                className='files-dropzone'
                onChange={setFiles}
                accepts={['.pdf']}
                maxFiles={1}
                maxFileSize={10000000}
                minFileSize={0}
                clickable
            >
                <div className="bg-gray-50 border border-gray-300 rounded p-10 text-center">
                    Drop files here or click to upload
                </div>
            </Files>
            {files.map(f => {
                return (
                    <div className="mt-5 text-blue-500 text-semibold flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        <div>{f.name}</div>
                    </div>
                )
            })}
            <div className="flex justify-end gap-5 mt-5">
                <Button label="Nazad" design="secondary" onClick={props.onClose}/>
                <Button label="Finalizuj" disabled={files.length === 0} onClick={handleFinalizeAgreement}/>
            </div>
        </Modal>
    )
}

FinalizeAgreementModal.propTypes = {
    agreement: PropTypes.object,
    onClose: PropTypes.func,
    onSuccess: PropTypes.func,
}

export default FinalizeAgreementModal