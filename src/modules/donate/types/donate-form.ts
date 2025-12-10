export interface DonateFormValues {
  amount: number;
  name: string;
  email: string;
  isAnonymous: boolean;
  message: string;
}

export interface DonateFormErrors {
  amount?: string;
  name?: string;
  email?: string;
  message?: string;
}
