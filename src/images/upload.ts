import {
  createWriteStream,
  createReadStream,
  existsSync,
  unlinkSync,
} from 'fs';

export const FolderImage = {
  Supplieproduct: 'master_product',
  masterSizeProduct: 'master_size_product',
};
import { SharpService } from 'nestjs-sharp';

//NOTE config sizeImages
const sharpService = new SharpService();
const roundedCorners = Buffer.from(
  '<svg><rect x="0" y="0" width="300" height="300"/></svg>',
);
/**
 *
 * @param file
 * @param folderName
 * @returns
 */
export const CreateUploadFile = async (file: any, folderName?: string) => {
  const { originalname, mimetype, path } = file;
  console.log(file);
  const encodedFileName = Buffer.from(originalname, 'binary').toString('utf-8');

  const write = createWriteStream(`./images/${encodedFileName}`);
  // const write = createWriteStream(`./images/${folderName}/${encodedFileName}`);

  const size = sharpService
    .edit()
    .resize(300, 300)
    .composite([
      {
        input: roundedCorners,
        blend: 'dest-in',
      },
    ])
    .png();

  createReadStream(`./${path}`).pipe(size).pipe(write);

  //   const imageInfo = {
  //     url: `${folderName}/${encodedFileName}`,
  //     fileName: encodedFileName,
  //     mimeType: mimetype,
  //     path: `${folderName}/`,
  //   };
};

export const verifyAndUpload = async (checkId: any, folderName?: string) => {
  const dataImage = checkId.image.fileName;

  if (dataImage) {
    if (existsSync(`./images/` + dataImage)) {
      unlinkSync(`./images/` + dataImage);
    } else {
      console.log('file not found');
    }
  }
};
