import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file)=> {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString(); //this will give the file extension name like png jpg etc

    //console.log(extName); 
    return parser.format(extName, file.buffer)
}

export default getDataUri;