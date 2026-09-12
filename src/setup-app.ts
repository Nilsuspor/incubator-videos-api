import express, { Express } from "express";
import { Request, Response } from 'express';
import { db } from "./db/in_memory.db";
import { Video } from "./videos/types/videos";
import {HttpStatus} from "./core/types/http-statused";
import { VideoInputDto } from "./videos/dto/video.input.dto";
import { VideoUpdateInputDto } from "./videos/dto/video.update.input.dto";

export const setupApp = (app: Express) => {
  app.use(express.json()); 
 
  
  app.get("/", (req: Request, res: Response) => {
    res.status(HttpStatus.Ok).send("Мой видеохостинг!");
  });
  
  app.get("/videos", (req: Request, res: Response) => {
    res.status(HttpStatus.Ok).send(db.videos);
  });

  app.get("/videos/:id", 
    (req: Request<{id:string}>, res: Response<Video>) => {
        const video =db.videos.find((v)=>v.id===+req.params.id)

        if (!video){
            res.sendStatus(HttpStatus.NotFound)
            return
        }
        res.status(HttpStatus.Ok).send(video)
  });

  app.post("/videos", 
    (req: Request<{}, {}, VideoInputDto>, res: Response<Video>) => {
        
    const createdDate = new Date()
    const publicationDate = new Date()
    publicationDate.setDate(createdDate.getDate()+1)

    const lastVideo = db.videos[db.videos.length -1]

    const newVideo: Video ={
        id: lastVideo ? lastVideo.id + 1 : 1,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: createdDate.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions: req.body.availableResolutions
    }

    db.videos.push(newVideo)
    res.status(HttpStatus.Created).send(newVideo)

  });

  app.put("/videos/:id", 
    (req: Request<{ id: string }, {}, VideoUpdateInputDto>, res: Response<Video>) => {
        const video =db.videos.find((v)=>v.id===+req.params.id)

        if (!video){
            res.sendStatus(HttpStatus.NotFound)
            return
        }
        video.title = req.body.title
        video.author = req.body.author
        video.availableResolutions = req.body.availableResolutions
        video.canBeDownloaded = req.body.canBeDownloaded
        video.minAgeRestriction = req.body.minAgeRestriction
        video.publicationDate = new Date().toISOString()
        
        res.sendStatus(HttpStatus.NoContent)
        
  });

  app.delete("/videos/:id", 
    (req: Request<{id:string}>, res: Response) => {
        const idToDelete = +req.params.id!;
        const videoIndex = db.videos.findIndex((video) => video.id === idToDelete);

        if (videoIndex<0){
            res.sendStatus(HttpStatus.NotFound)
            return
        }

        db.videos.splice(videoIndex,1)
        res.sendStatus(HttpStatus.NoContent)
  });

  app.delete("/testing/all-data", (req: Request, res: Response) => {
  db.videos = [];
  res.sendStatus(HttpStatus.NoContent);
});


  return app;
};