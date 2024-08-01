import { create } from 'zustand';
import { Patient, DraftPatient } from './types';

type PatientState = {
  patients: Patient[];
  addPatient: (data: DraftPatient) => void;
  detelePatient: (id: Patient['id']) => void;
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
  detelePatient: (id) => {
    set((state) => ({
      patients: state.patients.filter((patient) => patient.id !== id),
    }));
  },
}));
