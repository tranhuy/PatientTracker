import React, { useState, useEffect } from "react";
import { Grid, Button, Radio, Form } from "semantic-ui-react";
import { Field, Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { useStateValue } from "../state";

import { Entry, healthCheckRating } from "../types";
import { DiagnosisSelection, HealthCheckRatingOption, SelectField, TextField } from "../AddPatientModal/FormField";

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryFormValues =  UnionOmit<Entry, 'id'>;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
    setModalTitle: (title: string) => void;
}

const healthCheckRatingsOptions: HealthCheckRatingOption[] = [    
    { value: healthCheckRating.Healthy, label: `${healthCheckRating.Healthy} - ${healthCheckRating[healthCheckRating.Healthy]}` },
    { value: healthCheckRating.LowRisk, label: `${healthCheckRating.LowRisk} - ${healthCheckRating[healthCheckRating.LowRisk]}` },
    { value: healthCheckRating.HighRisk, label: `${healthCheckRating.HighRisk} - ${healthCheckRating[healthCheckRating.HighRisk]}` },
    { value: healthCheckRating.CriticalRisk, label: `${healthCheckRating.CriticalRisk} - ${healthCheckRating[healthCheckRating.CriticalRisk]}` }
];

const AddEntryForm = ({ onSubmit, onCancel, setModalTitle }: Props) => {
    const [{ diagonses }] = useStateValue();
    const [ entryType, setEntryType ] = useState('HealthCheck');

    useEffect(() => {
        switch (entryType) {
            case "HealthCheck":
                setModalTitle("Add Healthcheck Entry");
                break;
            case "OccupationalHealthcare":
                setModalTitle("Add Occupational Healthcare Entry");
                break;
        }
    }, [entryType]);

    const entryInitValues = {
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: undefined
    };

    const healthCheckEntryInitValues = {
        type: "HealthCheck",
        healthCheckRating: 0
    };

    const occHealthCareEntryInitValues = {
        type: "OccupationalHealthcare",
        employerName: "",
        sickLeave: {
            startDate: "",
            endDate: ""
        }
    };

    // const hospitalEntryEntryInitValues = {
    //     ...entryInitValues,
    //     type: "Hospital",
    //     discharge: {
    //         date: "",
    //         criteria: ""
    //     }
    // };

    return (
        <Formik
            initialValues={{ ...entryInitValues, healthCheckEntryInitValues, occHealthCareEntryInitValues }}
            onSubmit={ values => {
                if (entryType === 'HealthCheck') {
                    const rating = Number(values.healthCheckEntryInitValues.healthCheckRating);
                    onSubmit({ ...values, ...values.healthCheckEntryInitValues, healthCheckRating: rating } as EntryFormValues);
                } 
                
                if (entryType === 'OccupationalHealthcare') {
                    const sickLeave = (!values.occHealthCareEntryInitValues.sickLeave.startDate || !values.occHealthCareEntryInitValues.sickLeave.endDate) ? undefined : values.occHealthCareEntryInitValues.sickLeave;
                    onSubmit({ ...values, ...values.occHealthCareEntryInitValues, sickLeave } as EntryFormValues);
                }
            }}
            validationSchema={Yup.object().shape({
                description: Yup.string().required("Field is required"),
                date: Yup.string().required("Field is required"),
                specialist: Yup.string().required("Field is required"),                
                occHealthCareEntryInitValues: Yup.object().shape({
                    employerName: entryType === 'OccupationalHealthcare' ? Yup.string().required("Field is required") : Yup.string()
                })
            })}
            // validate={values => {
            //     const requiredError = "Field is required";
            //     const errors: { [field: string]: string } = {};

            //     if (!values.description) {   
            //         errors['description'] = requiredError;
            //     }
            //     if (!values.date) {
            //         errors['date'] = requiredError;
            //     }
            //     if (!values.specialist) {
            //         errors['specialist'] = requiredError;
            //     }

            //     return errors;
            // }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched, validateForm }) => {
                useEffect(() => {
                    void validateForm();
                }, [entryType]);

                return (
                    <FormikForm className="form ui">
                        <div className="inline fields">
                            <label>Entry Type :</label>
                            <Form.Field>
                                <Radio 
                                    label="Health Check" 
                                    name="entryType" 
                                    value="HealthCheck" 
                                    checked={entryType === "HealthCheck"}
                                    onChange={() => setEntryType("HealthCheck")} 
                                />
                            </Form.Field>
                            <Form.Field>
                                <Radio 
                                    label="Occupational Healthcare" 
                                    name="entryType" 
                                    value="OccupationalHealthcare"  
                                    checked={entryType === "OccupationalHealthcare"} 
                                    onChange={() => setEntryType("OccupationalHealthcare")} 
                                />
                            </Form.Field>
                        </div>
                        <Field 
                            label="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field 
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field 
                            label="Specialist"
                            name="specialist"
                            component={TextField}
                        />

                        {entryType === "OccupationalHealthcare" &&
                            <>
                                <Field 
                                    label="Employer Name"
                                    name="occHealthCareEntryInitValues.employerName"
                                    component={TextField}
                                />
                                <div className="inline fields">
                                    <label>Sick Leave</label>
                                    <Field 
                                        name="occHealthCareEntryInitValues.sickLeave.startDate"
                                        component={TextField}
                                    />
                                    <Field 
                                        name="occHealthCareEntryInitValues.sickLeave.endDate"
                                        component={TextField}
                                    />
                                </div>
                            </>
                        }

                        {entryType === "HealthCheck" &&
                            <SelectField 
                                label="Health Check Rating"
                                name="healthCheckEntryInitValues.healthCheckRating"
                                options={healthCheckRatingsOptions}
                            />
                        }
                        <DiagnosisSelection 
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagonses)}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">Cancel</Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </FormikForm>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;