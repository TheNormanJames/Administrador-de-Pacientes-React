import { create } from 'zustand';
import { Patient, DraftPatient } from './types';
import { devtools, persist } from 'zustand/middleware';

type PatientState = {
  patients: Patient[];
  activeId: Patient['id'];
  addPatient: (data: DraftPatient) => void;
  detelePatient: (id: Patient['id']) => void;
  getPatienById: (id: Patient['id']) => void;
  updatePatient: (data: DraftPatient) => void;
};

const createPatient = (patient: DraftPatient): Patient => {
  return { ...patient, id: crypto.randomUUID() };
};

export const usePatientStore = create<PatientState>()(
  devtools(
    persist(
      (set) => ({
        patients: [],
        activeId: '',
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
        getPatienById: (id) => {
          set(() => ({
            activeId: id,
          }));
        },
        updatePatient: (data) => {
          set((state) => ({
            patients: state.patients.map((patient) =>
              patient.id === state.activeId
                ? { id: state.activeId, ...data }
                : patient
            ),
            activeId: '',
          }));
        },
      }),
      {
        name: 'patient-storage',
      }
    )
  )
);
