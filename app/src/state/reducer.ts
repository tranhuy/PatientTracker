import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
  }  
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
    };

export const SetPatientList = (patientListApi: Patient[]): Action => {
  return {
      type: "SET_PATIENT_LIST",
      payload: patientListApi
  };
};

export const AddPatient = (patientApi: Patient): Action => {
  return {
      type: "ADD_PATIENT",
      payload: patientApi
  };
};

export const UpdatePatient = (patientApi: Patient): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: patientApi
  };
};

export const SetDiagnosesList = (diagnosesApi: Diagnosis[]): Action => {
  return {
      type: "SET_DIAGNOSES_LIST",
      payload: diagnosesApi
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "UPDATE_PATIENT": 
        return {
          ...state,
          ...state.patients[action.payload.id] = action.payload
        };
      case "SET_DIAGNOSES_LIST":
        return {
          ...state,
          diagonses: {
            ...action.payload.reduce((memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }), {}),
            ...state.diagonses
          }
        };
    default:
      return state;
  }
};
