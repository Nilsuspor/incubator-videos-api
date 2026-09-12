import type { VideoInputDto } from "../dto/video.input.dto";
import { Resolutions } from "../types/videos";
import { ValidationError } from "../../core/types/validation-error";


const isInvalidString = (value: unknown, min: number, max: number): boolean =>
  typeof value !== 'string' || value.trim().length < min || value.trim().length > max;


export const validateVideoInputDto = (
    data: VideoInputDto,
): ValidationError[] => {
    const errors:ValidationError[] = []
     
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
    
    
    
    return errors;
}


