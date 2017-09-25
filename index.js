const UPLOAD_PATH = 'media/';
const crypto = require('crypto');
const secret = 'kfhKSKNM73298-T28JSHJS820R8283R01923R';
const fs  = require('fs');


module.exports = class Files{
     constructor(req,files,folder){
         console.log('using app now')
        this.files = req.files ? req.files[files] || [] : [];
        this.files = Array.isArray(this.files)? this.files : Array(this.files);
        this.folder = folder;
    }

    static init(req,files,folder){
        return new Files(req,files,folder);
    }

    upload(callback,destination = null){
        console.log('attempting to upload ',this.files)
        this.uploaded = [];
        if(this.files.length){
            let newFile = (destination)? this.overWrite(destination) :this.newName()
            this.files.forEach(file => {
                let dFile = newFile.next().value;
                console.log(dFile);
                file.mv(dFile, (err) => {
                if(err) throw err;
                this.uploaded.push(this.strip(dFile))
                if(this.uploaded.length == this.files.length){
                    callback(this.uploaded,this.delete(this.uploaded.map(f => this.fullpath(f))));
                }
            })
            })
        }else{
            callback([],() => ()=> null)
        }
    }

    strip(file){
        return file.slice(file.lastIndexOf('/')+ 1);
    }

    fullpath(f){
        return `${UPLOAD_PATH}${this.folder}/${f}`;
    }

    * newName(){
        for(let file of this.rename(this.files)){
            yield this.fullpath(file)
        }
    }

    * overWrite(files){
        for(let file of files){
            yield this.fullpath(file);
        }
    }

    delete(files){
        return () =>{
            files.forEach(function(e){
                fs.unlinkSync(e);
            })
        }
    }

    rename(file){
        return file.map(file => {
            let ext = file.name.slice(file.name.lastIndexOf('.'));
            let newname = (new Date().toISOString() + Math.round(Math.random() * 99999999)).replace(/[\.T:-]/ig, '');
            let hash = crypto.createHmac('sha256', secret)
                .update(newname)
                .digest('hex');
            return  hash + ext;
        });
    }

    filter(filter = 'image'){
        this.files =  this.files.filter(file => file.mimetype.search(filter) !== -1);
        return this;
    }

    limit(limit){
        this.files = this.files.slice(0,limit);
        return this;
    }
}