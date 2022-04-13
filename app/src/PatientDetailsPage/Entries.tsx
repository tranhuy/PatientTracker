import React from "react";

import { useStateValue } from "../state";
import { Entry } from "../types";

import EntryDetails from "./EntryDetails";

const Entries = ({ entries }: { entries: Entry[] }) => {
    const [ { diagonses }, ] = useStateValue();
    return (
        <section style={{ display: 'flex', flexDirection: 'column', rowGap: '6px', marginBottom: '10px' }}>
            <div></div>
            <h3>Entries</h3>
            {
                entries.length > 0 ? entries.map(entry => 
                    <div key={entry.id} className="ui segment" style={{ margin: '0' }}>
                        <div><strong>{entry.date}</strong> {entry.description}</div>
                        <ul>
                            {
                                entry.diagnosisCodes?.map(code => 
                                    <li key={code}>{code} {diagonses[code] && diagonses[code].name}</li>    
                                )
                            }
                        </ul>
                        <EntryDetails entry={entry} />
                    </div>
                ) : 'No Entries'
            }
        </section>
    );
};

export default Entries;