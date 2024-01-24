export interface IFormInputsLitable {
    city: string;
    street: string;
    rent: number;
    imageUrl: FileList | String;
    id?: string,
}

export interface IFileImage {
    imageUrl: FileList | String;
}