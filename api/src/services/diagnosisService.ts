import diagnosesData from '../../data/diagnoses.json';
import { DiagnosisData } from '../types';

const diagnoses: Array<DiagnosisData> = diagnosesData;

const getAll = (): Array<DiagnosisData> => {
    return diagnoses;
}

export default {
    getAll
};