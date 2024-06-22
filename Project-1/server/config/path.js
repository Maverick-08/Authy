import path from 'path';
import {fileURLToPath} from 'url';

const filepath = fileURLToPath(import.meta.url);
// console.log(import.meta.url)
// file:///c:/Vivek/Coding/Projects/Authentication/Project-1/server/config/path.js (Windows do not support forward slashes)

const dirname = path.dirname(filepath);
// console.log(dirname);
// c:\Vivek\Coding\Projects\Authentication\Project-1\server\config
// Notice after passing it through path.dirname() function the path has changed according to your system specs.

const rootDir = path.join(dirname,"..");

export default rootDir ;
// console.log(rootDir);
// c:\Vivek\Coding\Projects\Authentication\Project-1\server