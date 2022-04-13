import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useStateValue, AddPatient, UpdatePatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Gender, Patient } from "../types";
import { Icon, Button } from "semantic-ui-react";

import Entries from "./Entries";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientDetailsPage = () => {
    const { id } = useParams<{ id: string}>();
    const [ { patients }, dispatch ] = useStateValue();
    const [ patient, setPatient ] = useState<Patient>(); 
    const [ modalOpen, setModalOpen ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | undefined>();
    
    useEffect(() => {
        void fetchPatientData();
    }, [patients[id]]);

    const fetchPatientData = async () => {
        try {
            if (!patients[id]) {
                const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);               
                dispatch(AddPatient(patient));
                setPatient(patients[id]);
            } else {
                setPatient(patients[id]);
            }
           
        } catch (e: unknown) {
            if (axios.isAxiosError(e) && e.response) {
                console.log(e.response?.data);
            }           
        }
    };

    const openModal = (): void => {
        setModalOpen(true);
    };

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };
    
    const addNewEntry = async (values: EntryFormValues) => {
        try {
            const { data: updatedPatient } = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}`, values);
            dispatch(UpdatePatient(updatedPatient));
            closeModal();
        } catch (e: unknown) {
            if (axios.isAxiosError(e) && e.response) {
                console.error(e.response?.data || 'Unknown Error');
                setError(e.response?.data?.error || 'Unknown error');
              } 
        }
    };

    const getGenderIcon = (gender: Gender): JSX.Element => {
        switch (gender) {
            case Gender.Male: 
                return <Icon name='mars' />;
            case Gender.Female:
                return <Icon name='venus' />;
            default:
                return <Icon name='genderless' />;
        }
    };

    if (!patient) {
        return <div>Patient Not Found</div>;
    }

    return (
        <div>
            <h2>{patient.name} {getGenderIcon(patient.gender)}</h2>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            <Entries entries={patient.entries} />
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={addNewEntry}
                error={error}
                onClose={closeModal}
            ></AddEntryModal>
            <Button onClick={() => openModal()}>Add New Entry</Button>
        </div>
    );
};

export default PatientDetailsPage;