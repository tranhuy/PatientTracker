import React from "react";

import { Entry } from "../types";

const EntryDetails: React.FC<{ entry: Entry }>= ({ entry }) => {
    const assertNever = (value: never): never => {
        throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
    };

    switch (entry.type) {
    case "HealthCheck":
        return <HealthCheckEntry entry={entry} />;
    case "Hospital": 
        return <HositalEntry entry={entry} />;
    case "OccupationalHealthcare":
        return <OccupationalHealthCareEntry entry={entry} />;
    default:
        return assertNever(entry);
    }
};

export default EntryDetails;

type HositalEntryProps = {
    discharge: {
        date: string,
        criteria: string
    }
};

const HositalEntry = ({ entry }: { entry: HositalEntryProps }) => {
    return (
        <div>
            <div>Discharge Date: {entry.discharge.date}</div>
            <div>Discharge Reason: {entry.discharge.criteria}</div>
        </div>
    );
};

const OccupationalHealthCareEntry =  ({ entry }: { entry: Entry }) => {
    if (entry.type !== "OccupationalHealthcare") return null;

    return (
        <div>
            <div>Employer: {entry.employerName}</div>
            {
                entry.sickLeave && <div>Sick Leave: {entry.sickLeave?.startDate}-{entry.sickLeave?.endDate}</div>
            }           
        </div>
    );
};

const HealthCheckEntry =  ({ entry }: { entry: Entry }) => {
    if (entry.type !== "HealthCheck") return null;

    return (
        <div>
            Health Rating: {entry.healthCheckRating}
        </div>
    );
};