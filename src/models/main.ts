export interface OptionValue {
  value: string;
  label: string;
}
export enum BeneficiaryType {
  SSDU = "SSDU",
  IDDP = "IDDP",
}

export enum Role {
  SYSTEM = "SYSTEM",
  ADMIN = "ADMIN",
  DYCOLL = "DYCOLL",
  ACCOUNTS = "ACCOUNTS",
  SCSCT = "SCSCT",
  DOCTOR = "DOCTOR",
  STOCKMEN = "STOCKMEN",
  ANIMALHUSBANDRY = "ANIMALHUSBANDRY",
  SELLERCOW = "SELLERCOW",
  SELLERMEDICINE = "SELLERMEDICINE",
  SELLERFODDER = "SELLERFODDER",
  FARMER = "FARMER",
}
