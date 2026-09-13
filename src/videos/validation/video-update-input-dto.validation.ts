import type { VideoUpdateInputDto } from "../dto/video.update.input.dto";
import { Resolutions } from "../types/videos";
import { ValidationError } from "../../core/types/validation-error";

const isInvalidString = (value: unknown, min: number, max: number): boolean =>
  typeof value !== 'string' || value.trim().length < min || value.trim().length > max;

export const validateVideoUpdateInputDto = (
    data: VideoUpdateInputDto,
): ValidationError[] => {
    const errors:ValidationError[] = []
    const isoPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;

 if(isInvalidString(data.title, 1, 40)){
       errors.push({message:'invalide title', field: 'title'}) 
    }

    if(isInvalidString(data.author, 1, 20)){
        errors.push({message: 'invalid author', field: 'author'})
    }
    
    if (!Array.isArray(data.availableResolutions)|| data.availableResolutions.length === 0){
        errors.push({
            message:'availableResolutions must be an array with at least one item',
            field: 'availableResolutions'
        })
    } else{
        const validResolutions = Object.values(Resolutions)
        const hasInvalidResolution = data.availableResolutions.some(
            (resolution)=>!validResolutions.includes(resolution)
        );

        if (hasInvalidResolution) {
            errors.push({
                message:'Invalid resolution',
                field: 'availableResolutions'
            })
        }
    }

    if(typeof data.canBeDownloaded !== 'boolean'){
        errors.push({
            message:'must be boolean',
            field:'canBeDownloaded'
        })
    }

    if((data.minAgeRestriction!==null && typeof data.minAgeRestriction !== 'number')||(typeof data.minAgeRestriction==='number'&& (1>data.minAgeRestriction||data.minAgeRestriction>18))){
        errors.push({
            message:'invalid data',
            field:'minAgeRestriction'
        })
     
    }

    if(typeof data.publicationDate!=='string' || !isoPattern.test(data.publicationDate)||isNaN(Date.parse(data.publicationDate))){
         errors.push({
            message:'Date format is invalid',
            field:'publicationDate'
        })
    }
    

    return errors
}