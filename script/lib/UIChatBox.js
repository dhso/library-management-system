var _targetId;
var $UIChatBox = {
    open : function(callback) {
        api.require('UIChatBox').open({
            placeholder : '',
            maxRows : 4,
            emotionPath : 'widget://image/emotion',
            texts : {
                recordBtn : {
                    normalTitle : '按住 说话',
                    activeTitle : '松开 结束'
                },
                sendBtn : {
                    title : "发送"
                }
            },
            styles : {
                inputBar : {
                    borderColor : '#d9d9d9',
                    bgColor : '#f2f2f2'
                },
                inputBox : {
                    borderColor : '#B3B3B3',
                    bgColor : '#FFFFFF'
                },
                emotionBtn : {
                    normalImg : 'widget://image/chatBox/face1.png'
                },
                extrasBtn : {
                    normalImg : 'widget://image/chatBox/add1.png'
                },
                keyboardBtn : {
                    normalImg : 'widget://image/chatBox/key1.png'
                },
                speechBtn : {
                    normalImg : 'widget://image/chatBox/key3.png'
                },
                recordBtn : {
                    normalBg : '#c4c4c4',
                    activeBg : '#999999',
                    color : '#000',
                    size : 14
                },
                indicator : {
                    target : 'both',
                    color : '#c4c4c4',
                    activeColor : '#9e9e9e'
                },
                sendBtn : {
                    bg : '#4cc518',
                    titleColor : '#ffffff',
                    activeBg : '#46a91e',
                    titleSize : 13
                }
            },
            extras : {
                titleSize : 10,
                titleColor : '#a3a3a3',
                btns : [{
                    title : '图片',
                    normalImg : 'widget://image/chatBox/album1.png',
                    activeImg : 'widget://image/chatBox/album2.png'
                }, {
                    title : '拍照',
                    normalImg : 'widget://image/chatBox/cam1.png',
                    activeImg : 'widget://image/chatBox/cam2.png'
                }, {
                    title : '位置',
                    normalImg : 'widget://image/chatBox/loc1.png',
                    activeImg : 'widget://image/chatBox/loc2.png'
                }]
            }
        }, function(ret, err) {
            if ( typeof callback == 'function') {
                callback(ret, err);
            }
        });
    },
    addEventListener : function(target, name, callback) {
        api.require('UIChatBox').addEventListener({
            target : target,
            name : name
        }, function(ret, err) {
            if ( typeof callback == 'function') {
                callback(ret, err);
            }
        });
    },
    closeBoard : function() {
        api.require('UIChatBox').closeBoard();
    },
    closeKeyboard : function() {
        api.require('UIChatBox').closeKeyboard();
    }
}
