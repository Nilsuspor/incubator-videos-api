import { Resolutions } from "../types/videos";

export type VideoInputDto = {
    title: string,
    author: string,
    availableResolutions: Resolutions[]
}