import React, { useState } from "react";
import { Modal, Segment } from "semantic-ui-react";
import AddEntryForm, { EntryFormValues } from "./AddEntryForm";

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntryFormValues) => void;
    error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
    const [ title, setTitle ] = useState('');

    const setModalTitle = (title: string) => {
        setTitle(title);
    };

    return (
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddEntryForm onSubmit={onSubmit} onCancel={onClose} setModalTitle={setModalTitle} />
            </Modal.Content>
        </Modal>
    );
};

export default AddEntryModal;

