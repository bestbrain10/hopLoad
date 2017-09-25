# hopLoad
My NodeJS file upload


## example

`fileUpload.init(req,'files_to_upload','discover')
.filter();//filter out images
.limit(2)//limit number of files to be uploaded
.upload((files,rollback)=>{
    rollback(); //to delete uploaded files
    res.json(files);
},[
        "d86c43a439cc045bb704e64feca77c31ea5b0e4cf28c07f770211a74ab2c8961.jpg",
        "213524de6ad7456b4b2b7253daa86c7f7ce829d84572b16080de0db19a330bc4.jpg",
        "d769b6a7390b6937c3606703585b1102301612c6e5a6ff81527d734eafc15ea3.jpg"
])`
