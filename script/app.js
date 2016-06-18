//定义内部版本号
var _APP_ = {
    version : '1.0',
    id : 'A6916493085654'
}
//表情存放目录
var emotionSourcePath = 'widget://image/emotion';
//定义数据服务器地址
var _WS_DOMAIN_ = 'http://114.215.204.234:8080/sunset/';

var _WS_ = {
    timeOut : 3000,
    userRegister : _WS_DOMAIN_ + 'ws/user/register.do',
    userLogin : _WS_DOMAIN_ + 'ws/user/login.do',
    userInfoGet : _WS_DOMAIN_ + 'ws/user/info/get.do',
    userInfoUpdate : _WS_DOMAIN_ + 'ws/user/info/update.do',
    userListSearch : _WS_DOMAIN_ + 'ws/user/list/search.do',
    friendApplyApply : _WS_DOMAIN_ + 'ws/friend/apply/apply.do',
    friendApplyList : _WS_DOMAIN_ + 'ws/friend/apply/list.do',
    friendApplyDeal : _WS_DOMAIN_ + 'ws/friend/apply/deal.do',
    friendListGet : _WS_DOMAIN_ + 'ws/friend/list/get.do',
    friendListRemove : _WS_DOMAIN_ + 'ws/friend/list/remove.do',
    deviceInfoUpdate : _WS_DOMAIN_ + 'ws/device/info/update.do',
    fileUpload : _WS_DOMAIN_ + 'file/upload',
    userContactGet : _WS_DOMAIN_ + 'ws/user/contact/get.do',
    userContactAdd : _WS_DOMAIN_ + 'ws/user/contact/add.do',
    userContactUpdate : _WS_DOMAIN_ + 'ws/user/contact/update.do',
    homeQuery : _WS_DOMAIN_ + 'ws/home/query_list.do',
    homeCreate : _WS_DOMAIN_ + 'ws/home/create.do',
    homeQueryDetail : _WS_DOMAIN_ + 'ws/home/query_detail.do',
    homePraise : _WS_DOMAIN_ + 'ws/home/praise.do',
    homeJoin : _WS_DOMAIN_ + 'ws/home/join.do',
    homeComment : _WS_DOMAIN_ + 'ws/home/comment.do',
    homeSlider : _WS_DOMAIN_ + 'ws/home/query_top.do'
}

var _USER_INFO;

var $_app = {
    isFirstLaunch : function(callback) {
        //设置当前版本号
        var lastAppVersion = $_storage.get('_LAST_APP_VERSION');
        if (!lastAppVersion || lastAppVersion != _APP_.version) {
            //启动欢迎页
            if ($_util.isFunction(callback)) {
                callback();
            }
            //设置第一次启动的版本号
            $_storage.set('_LAST_APP_VERSION', _APP_.version);
        }
    },
    updateWidget : function() {
        $_event.addListener('smartupdatefinish', function(ret, err) {
            if (ret.value[0].extra) {
                $_ui.confirm(ret.value[0].extra, '请重启应用', ['重启'], [$_app.exit]);
            }
        });
    },
    exit : function() {
        $_widget.close(_APP_.id, '', true);
    },
    keybackExit : function() {
        if (api.systemType == 'android') {
            $_event.addListener('keyback', '', function(ret, err) {
                if ($_storage.get('back_btn_press_time') && $_date.now() - $_storage.get('back_btn_press_time') < 1000) {
                    //$_widget.close(_APP_.id, '', true);
                    $_app.runBackGround();
                    return false;
                }
                $_ui.toast('再按一次返回键退出');
                $_storage.set('back_btn_press_time', $_date.now());
            });
        }
    },
    runBackGround : function() {
        api.toLauncher();
    },
    changeConnectStatusTip : function(ret, dom) {
        switch(ret.connectionStatus) {
            case 'CONNECTED':
                $(dom).text('');
                break;
            case 'CONNECTING':
                $(dom).text('通讯服务器连接中...');
                break;
            case 'DISCONNECTED':
                $(dom).text('通讯服务器已断开');
                break;
            case 'KICKED':
                $(dom).text('已在其他设备登录，即将断开连接...');
                break;
            case 'NETWORK_UNAVAILABLE':
                $(dom).text('网络不可用，请检查网络');
                break;
            case 'SERVER_INVALID':
                $(dom).text('服务器异常或不可连接');
                break;
        }
    }
}

var $_system = {
    setStatusBarStyle : function(style, color) {
        api.setStatusBarStyle({
            style : style,
            color : color
        });
    }
}

var $_widget = {
    open : function(id, wgtParam, animation, callback) {
        api.openWidget({
            id : id,
            wgtParam : wgtParam,
            animation : animation
        }, function(ret, err) {
            callback(ret, err);
        });
    },
    close : function(id, retData, silent, animation) {
        api.closeWidget({
            id : id,
            retData : retData,
            silent : silent,
            animation : animation
        });
    }
}

var $_ui = {
    toast : function(msg, duration, location) {
        api.toast({
            msg : msg,
            duration : duration,
            location : location
        });
    },
    confirm : function(title, msg, buttons, funcs) {
        api.confirm({
            title : title,
            msg : msg,
            buttons : buttons
        }, function(ret, err) {
            if ($_util.isFunction(funcs[ret.buttonIndex - 1])) {
                funcs[ret.buttonIndex -1 ]();
            };
        });
    },
    alert : function(title, msg, button, func) {
        api.alert({
            title : title,
            msg : msg,
            buttons : button
        }, function(ret, err) {
            if ($_util.isFunction(func)) {
                func();
            };
        });
    },
    progress : {
        show : function(title, text, modal) {
            api.showProgress({
                title : title ? title : '努力加载中...',
                text : text ? text : '请稍等片刻',
                modal : modal
            });
        },
        hide : function() {
            api.hideProgress();
        }
    }
}
var $_storage = {
    set : function(k, v) {
        $api.setStorage(k, v);
    },
    get : function(k) {
        return $api.getStorage(k);
    },
    remove : function(k) {
        $api.rmStorage(k);
    },
    clear : function() {
        $api.clearStorage();
    }
}

var $_prefs = {
    set : function(k, v) {
        api.setPrefs({
            key : k,
            value : v
        });
    },
    get : function(k, callback) {
        api.getPrefs({
            key : k
        }, function(ret, err) {
            callback(ret.value);
        });
    },
    remove : function(k) {
        api.removePrefs({
            key : k
        });
    }
}

var $_date = {
    now : function() {
        return new Date().getTime();
    },
    format : function(datetime, formatStr) {
        console.log(datetime);
        var date = {
            "M+" : datetime.getMonth() + 1,
            "d+" : datetime.getDate(),
            "h+" : datetime.getHours(),
            "m+" : datetime.getMinutes(),
            "s+" : datetime.getSeconds(),
            "q+" : Math.floor((datetime.getMonth() + 3) / 3),
            "S+" : datetime.getMilliseconds()
        };
        if (/(y+)/i.test(formatStr)) {
            formatStr = formatStr.replace(RegExp.$1, (datetime.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(formatStr)) {
                formatStr = formatStr.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return formatStr;
    },
    tmFormat : function(timestamp, formatStr) {
        return $_date.format(new Date(parseInt(timestamp)), formatStr);
    }
}

var $_util = {
    isFunction : function(func) {
        return ( typeof func == 'function');
    },
    setDefault : function(val, def) {
        if ( typeof (val) == undefined || val == null || val == '') {
            return def;
        }
        return val;
    },
    //排序函数
    getSort : function(order, sortBy) {
        var ordAlpah = (order == 'asc') ? '>' : '<';
        var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
        return sortFun;
    },
    convertImgToBase64 : function(url, callback, outputFormat) {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var img = new Image;
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL(outputFormat || 'image/png');
            callback.call(this, dataURL);
            // Clean up
            canvas = null;
        };
        img.src = url;
    }
}

var $_constant = {
    headers : {
        json : {
            'Content-type' : 'application/json;charset=UTF-8'
        }
    },
    animation : {
        none : {
            type : 'none',
            duration : 350
        }
    }
}
var $_window = {
    open : function(name, url, pageParam, animation, slidBackEnabled) {
        api.openWin({
            name : name,
            url : url,
            pageParam : pageParam,
            animation : animation ? animation : {
                duration : 350
            },
            slidBackEnabled : slidBackEnabled
        });
    },
    close : function(name, animation) {
        if (name && animation) {
            api.closeWin({
                name : name,
                animation : animation ? animation : {
                    duration : 350
                }
            });
        } else {
            api.closeWin();
        }
    },
    execScript : function(winName, ifrName, script) {
        api.execScript({
            name : winName,
            frameName : ifrName,
            script : script
        });
    },
    setAttr : function(name, bounces, slidBackEnabled) {
        api.setFrameAttr({
            name : name,
            bounces : bounces,
            slidBackEnabled : slidBackEnabled
        });
    }
}

var $_frame = {
    open : function(name, url, pageParam, rect, bounces, progress, reload, animation) {
        api.openFrame({
            name : name,
            url : url,
            pageParam : pageParam,
            rect : rect,
            bounces : bounces ? bounces : false,
            progress : progress,
            reload : reload,
            animation : animation,
            vScrollBarEnabled : false,
            hScrollBarEnabled : false
        });
        api.bringFrameToFront({
            from : name
        });
    },
    hide : function(name) {
        api.setFrameAttr({
            name : name,
            hidden : true,
        });
    },
    close : function(name) {
        api.closeFrame({
            name : name
        });
    },
    top : function(name) {
        api.bringFrameToFront({
            from : name
        });
    },
    setAttr : function(name, rect, bounces) {
        api.setFrameAttr({
            name : name,
            bounces : bounces,
            rect : rect
        });
    }
}

var $_voice = {
    //录音格式为amr
    startRrecord : function(path) {
        api.startRecord({
            path : path
        });
    },
    stopRrecord : function(callback) {
        api.stopRecord(function(ret, err) {
            if ( typeof callback == 'function') {
                callback(ret, err);
            }
        });
    },
    startPlay : function(path, callback) {
        api.startPlay({
            path : path
        }, function(ret, err) {
            if ( typeof callback == 'function') {
                callback(ret, err);
            }
        });
    },
    stopPlay : function() {
        api.stopPlay();
    }
}
var $_picture = {
    get : function(sourceType, encodingType, mediaValue, destinationType, allowEdit, quality, targetWidth, targetHeight, saveToPhotoAlbum, callback) {
        api.getPicture({
            sourceType : sourceType,
            encodingType : encodingType,
            mediaValue : mediaValue,
            destinationType : destinationType,
            allowEdit : allowEdit,
            quality : quality,
            targetWidth : targetWidth,
            targetHeight : targetHeight,
            saveToPhotoAlbum : saveToPhotoAlbum
        }, function(ret, err) {
            if ( typeof callback == 'function') {
                callback(ret, err);
            }
        });
    },
    upload : function(sourceType, encodingType, mediaValue, destinationType, allowEdit, quality, targetWidth, targetHeight, saveToPhotoAlbum, getPicCallback, url, values, uploadCallback) {
        $_picture.get(sourceType, encodingType, mediaValue, destinationType, allowEdit, quality, targetWidth, targetHeight, saveToPhotoAlbum, function(gtRet, gtErr) {
            if ( typeof getPicCallback == 'function') {
                getPicCallback(gtRet, gtErr);
            }
            if (gtRet && gtRet.data) {
                $_http.upload(url, values, {
                    file : gtRet.data
                }, function(upRet, upErr) {
                    if ( typeof uploadCallback == 'function') {
                        uploadCallback(upRet, upErr);
                    }
                });
            }
        });
    }
}
var $_frameGroup = {
    open : function(name, scrollEnabled, rect, frames) {
        api.openFrameGroup({
            name : name,
            scrollEnabled : scrollEnabled ? scrollEnabled : false,
            rect : rect,
            frames : frames
        });
    },
    close : function(name) {
        api.closeFrameGroup({
            name : name
        });
    },
    top : function(name, index, reload) {
        api.setFrameGroupIndex({
            name : name,
            index : index,
            reload : reload
        });
    }
}

var $_http = {
    ajax : function(tag, method, url, body, stream, values, files, headers, returnAll, callback) {
        api.ajax({
            url : url,
            tag : tag,
            method : method,
            headers : headers,
            returnAll : returnAll,
            data : {
                values : values,
                files : files,
                body : JSON.stringify(body),
                stream : stream
            }
        }, function(ret, err) {
            callback(ret, err);
        });
    },
    cancel : function(tag) {
        api.cancelAjax({
            tag : tag
        });
    },
    get : function(url, fnSuc, dataType) {
        $api.get(url, fnSuc, dataType);
    },
    post : function(url, data, files, fnSuc, dataType) {
        $api.post(url, data, files, fnSuc, dataType);
    },
    upload : function(url, values, files, callback) {
        api.ajax({
            url : url,
            method : 'post',
            data : {
                values : values,
                files : files
            }
        }, function(ret, err) {
            if ( typeof callback == 'function') {
                callback(ret, err);
            }
        });
    },
    getFromCache : function(folder, id, tag, method, url, body, stream, values, files, headers, returnAll, callbackSuc, callbackErr) {
        $_file.read(api.cacheDir + '/' + folder + '/' + id + '.json', function(ret, err) {
            var _localData, _remoteData;
            if (ret.status) {
                _localData = $api.strToJson(ret.data);
                if ( typeof callbackSuc == 'function') {
                    callbackSuc(_localData);
                }
            }
            $_http.ajax(tag, method, url, body, stream, values, files, headers, returnAll, function(ret, err) {
                if (ret) {
                    _remoteData = ret;
                    if ($api.jsonToStr(_localData) != $api.jsonToStr(_remoteData)) {
                        $_file.write(api.cacheDir + '/' + folder + '/' + id + '.json', $api.jsonToStr(ret), function(ret, err) {
                            if ( typeof callbackSuc == 'function') {
                                callbackSuc(_remoteData);
                            }
                        });
                    }
                } else {
                    if ( typeof callbackErr == 'function') {
                        callbackErr(err);
                    }
                }
            });
        });
    }
}

var $_cache = {
    image : function(url, policy, thumbnail, callback) {
        api.imageCache({
            url : url,
            policy : policy,
            thumbnail : thumbnail
        }, function(ret, err) {
            if ($_util.isFunction(callback)) {
                callback();
            }
        });
    }
}
var $_download = {
    download : function(url, savePath, report, cache, allowResume, callback) {
        api.download({
            url : url,
            savePath : savePath,
            report : report,
            cache : cache,
            allowResume : allowResume
        }, function(ret, err) {
            callback(ret, err);
        });
    },
    cancel : function(url) {
        api.cancelDownload({
            url : url
        });
    }
}

var $_file = {
    read : function(path, callback) {
        api.readFile({
            path : path
        }, function(ret, err) {
            callback(ret, err);
        });
    },
    write : function(path, data, callback) {
        api.writeFile({
            path : path,
            data : data
        }, function(ret, err) {
            callback(ret, err);
        });
    }
}

var $_event = {
    addListener : function(name, extra, callback) {
        api.addEventListener({
            name : name,
            extra : extra
        }, function(ret, err) {
            callback(ret, err);
        });
    },
    removeListener : function(name) {
        api.removeEventListener({
            name : name
        });
    },
    send : function(name, extra) {
        api.sendEvent({
            name : name,
            extra : extra
        });
    }
}

var $_notification = {
    create : function(notify, vibrate, sound, light, callback) {
        api.notification({
            vibrate : vibrate ? [500, 500] : [0],
            sound : sound,
            light : light,
            notify : notify
        }, function(ret, err) {
            if ( typeof callback == 'function') {
                callback(ret, err);
            }
        });
    },
    cancel : function(id) {
        api.cancelNotification({
            id : id
        });
    }
}

var $_refresh = {
    setHeaderInfo : function(callback, visible, loadingImg, bgColor, textColor, textDown, textUp, textLoading, textTime, showTime) {
        api.setRefreshHeaderInfo({
            visible : visible,
            loadingImg : loadingImg,
            bgColor : bgColor ? bgColor : '#efeff4',
            textColor : textColor ? textColor : '#797979',
            textDown : textDown ? textDown : '下拉刷新...',
            textUp : textUp ? textUp : '松开刷新...',
            textLoading : textLoading ? textLoading : '努力加载中...',
            textTime : textTime,
            showTime : showTime
        }, function(ret, err) {
            if ( typeof callback == 'function') {
                callback(ret, err);
            }
        });
    },
    headerLoading : function() {
        api.refreshHeaderLoading();
    },
    headerLoadDone : function() {
        api.refreshHeaderLoadDone();
    }
}
var S = {
    init : function() {

    },

    //静默更新

    //获得设备编号
    get_deviceId : function() {
        return api.deviceId.replace(/\-/g, "");
    },
}