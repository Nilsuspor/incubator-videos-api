export enum Resolutions  {
    P_144 = "P144", 
    P_240 = "P240", 
    P_360 ="P360", 
    P_480 ="P480", 
    P_720 ="P720",
    P_1080 = "P1080",
    P_1440 = "P1440", 
    P_2160 ="P2160"}


export type Video = {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean | false;
    minAgeRestriction: number | null;
    createdAt: string;
    publicationDate: string;
    availableResolutions: Resolutions[];
};
