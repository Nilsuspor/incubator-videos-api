import type { VideoInputDto } from "../dto/video.input.dto";
import { Resolutions } from "../types/videos";
import { ValidationError } from "../../core/types/validation-error";


const isInvalidString = (value: unknown, min: number, max: number): boolean =>
  typeof value !== 'string' || value.trim().length < min || value.trim().length > max;


export const validateVideoInputDto = (
    data: VideoInputDto,
): ValidationError[] => {
    const errors:ValidationError[] = []
     
    
    
    
    
    
    return errors;
}


