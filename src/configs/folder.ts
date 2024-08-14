import { promises } from 'fs';

export async function Folder() {
  promises
    .mkdir('./images/', { recursive: true })
    .catch((error) => console.log(error));
}
