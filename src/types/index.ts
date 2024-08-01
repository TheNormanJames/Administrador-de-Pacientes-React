export type Patient = {
  id: string;
  name: string;
  caretaker: string;
  email: string;
  date: Date;
  symptoms: string;
};

export type DraftPacient = Omit<Patient, 'id'>;
