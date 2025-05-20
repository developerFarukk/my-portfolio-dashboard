

export type Tblog = {
    _id?: string,
    title: string;
    content: string;
    image: FileList | string | null;
    category?: string;
    createdAt: string;
    updatedAt: string;
};
