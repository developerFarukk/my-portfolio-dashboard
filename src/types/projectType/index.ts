
export type TProject = {
    _id?: string;
    title: string;
    descriptions: string;
    liveLink: string;
    image?: string;
    githubClient?: string
    githubServer?: string
    techStack?: string[];
    features?: string[];
    category?: string;
    isTeamProject?: boolean;
    contributors?: string[];
    videoDemo?: string;
    createdAt: string;
    updatedAt: string;
};