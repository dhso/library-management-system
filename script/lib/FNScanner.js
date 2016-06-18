var $FNScanner = {
    openScanner : function(sound, autorotation, saveToAlbum, saveImg, callback) {
        api.require('FNScanner').openScanner({
            sound : sound,
            autorotation : autorotation,
            saveToAlbum : saveToAlbum,
            saveImg : saveImg
        }, function(ret, err) {
            if ( typeof callback == 'function') {
                callback(ret, err);
            }
        });
    },
    openView : function(rect, sound, autorotation, saveToAlbum, saveImg, fixedOn, fixed, callback) {
        api.require('FNScanner').openView({
            rect : rect,
            sound : sound,
            autorotation : autorotation,
            saveToAlbum : saveToAlbum,
            saveImg : saveImg,
            fixedOn : fixedOn,
            fixed : fixed
        }, function(ret, err) {
            if ( typeof callback == 'function') {
                callback(ret, err);
            }
        });
    },
    setFrame : function(x, y, w, h) {
        api.require('FNScanner').setFrame({
            x : x,
            y : y,
            w : w,
            h : h
        })
    },
    closeView : function() {
        api.require('FNScanner').closeView();
    },
    decodeImg : function(sound, path, callback) {
        api.require('FNScanner').decodeImg({
            sound : sound,
            path : path
        }, function(ret, err) {
            if ( typeof callback == 'function') {
                callback(ret, err);
            }
        });
    },
    encodeImg : function(type, content, saveToAlbum, saveImg, callback) {
        api.require('FNScanner').encodeImg({
            type : type,
            content : content,
            saveToAlbum : saveToAlbum,
            saveImg : saveImg
        }, function(ret, err) {
            if ( typeof callback == 'function') {
                callback(ret, err);
            }
        });
    },
    switchLight : function(status) {
        api.require('FNScanner').switchLight({
            status : status
        });
    }
}
