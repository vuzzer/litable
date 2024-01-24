export interface Litable {
    city: string;
    street: string;
    rent: number;
    imageUrl: string[];
    _id: string;
}

export interface RawData{
    data: Litable[],
    metadata: {numberPages:number, currentPage: number}
}