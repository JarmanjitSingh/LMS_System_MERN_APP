import multer from "multer";

const storage = multer.memoryStorage();

const singleUpload = multer({storage}).single("file"); //this file string will be same from the variable of req.file

export default singleUpload //add this function in the route just begining the controller function


//with the help of this multer function we are able to access the files from req.file