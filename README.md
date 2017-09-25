# hopLoad
My NodeJS file upload wrapper for express-fileUpload


## example

```Javascript
fileUpload.init(req,'files_to_upload','folder') 
.exclude();//filter out file type, I am using thier mimetype
.include();//you should use only one filter, it doesnt make sense using both include and exclude
.limit(2)//limit number of files to be uploaded
.upload((files,rollback)=>{
    rollback(); //to delete uploaded files incase of errors during some callback operation
    res.json(files);
},[
        "d86c43a439cc045bb704e64feca77c31ea5b0e4cf28c07f770211a74ab2c8961.jpg",
        "213524de6ad7456b4b2b7253daa86c7f7ce829d84572b16080de0db19a330bc4.jpg",
        "d769b6a7390b6937c3606703585b1102301612c6e5a6ff81527d734eafc15ea3.jpg"
])//second optional arguments for existing files you want to overwrite
```

## Note
The order at which you chain methods matters
 - filters (```exclude``` and ```include```) should come first
 - ```limit``` should come after filters
 - ```upload``` should always be the last
