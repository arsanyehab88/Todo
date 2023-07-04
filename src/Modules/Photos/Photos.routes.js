import Router from 'express';
import { auth } from '../../MiddleWare/auth.js';
import { FileUpload } from '../../utils/FileUpload.js';
import { AddPhoto, DeletePhoto } from './Photos.controller.js';

const PhotoRouter = Router();



PhotoRouter.post("/",FileUpload(),AddPhoto)
PhotoRouter.delete("/",auth,DeletePhoto)





export default PhotoRouter;