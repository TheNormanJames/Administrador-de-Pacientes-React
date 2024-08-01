import { create } from 'zustand';
import { Patient, DraftPatient } from './types';

type PatientState = {
  patients: Patient[];
  addPatient: (data: DraftPatient) => void;
};

const createPatient = (patient: DraftPatient): Patient => {
  return { ...patient, id: crypto.randomUUID() };
};

export const usePatientStore = create<PatientState>((set) => ({
  patients: [],
  addPatient: (data) => {
    const newPatient = createPatient(data);
    set((state) => ({
      patients: [...state.patients, newPatient],
    }));
  },
}));
