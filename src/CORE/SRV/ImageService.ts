import { Request, Response } from "express";
const fs = require('fs');
import { TResult } from '../DTO/TResult/TResult';

class ImageService {

  public async saveImage(req: Request, res: Response) {
    let tResult = new TResult();
    let { image, id } = req.body;

    const _path = `/var/www/html/images/${id}.jpg`;
    const base64Data = image.replace(/^data:image\/png;base64,/, "");

    fs.writeFile(_path, base64Data, 'base64', (err) => {
      if (err) {
        console.log(err);
        return res.json(tResult.CreateTResult<Boolean>(false, ["No se pudo crear la imagen"]));
      }
      return res.json(tResult.CreateTResult<Boolean>(true, []));
    });

  }

}
const imageService = new ImageService();
export default imageService;
