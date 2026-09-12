import { Resolutions, Video } from "../videos/types/videos";

export const db = {
    videos:<Video[]>[
        {
            id: 1,
            title: 'Кругосветка на осле',
            author: "Дмитрий Пирогов",
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: [Resolutions.P_1080, Resolutions.P_720]
        },
        {
            id: 2,
            title: 'Ныряю в жерло вулкана',
            author: "Николай Самогонов",
            canBeDownloaded: true,
            minAgeRestriction: 18,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: [Resolutions.P_144]
        }
    ]
}