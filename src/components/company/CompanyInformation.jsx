import React from "react";
import Block from "../common/Block";
import PropTypes from "prop-types";
import TextField from "../common/TextField";

function CompanyInformation(props) {
    function renderPlaceholder() {
        return null
    }

    function renderContent() {
        return (
            <div className="grid grid-cols-2 gap-5">
                <TextField label="Naziv" readOnly value={props.company.naziv}/>
                <TextField label="Sifra delatnosti" readOnly value={props.company.sifraDelatnosti}/>
                <TextField label="Maticni broj" readOnly value={props.company.maticniBroj}/>
                <TextField label="PIB" readOnly value={props.company.pib}/>
                <TextField label="Adresa" readOnly value={props.company.adresa}/>
                <TextField label="Drzava" readOnly value={props.company.drzava}/>
            </div>
        )
    }

    return (
        <Block title="Podaci">
            {!props.company && renderPlaceholder()}
            {props.company && renderContent()}
        </Block>
    )
}

CompanyInformation.propTypes = {
    company: PropTypes.object,
}

export default CompanyInformation;