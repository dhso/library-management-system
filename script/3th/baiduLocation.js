var $baiduLocation = {
    startLocation : function(accuracy, filter, autoStop, callback) {
        api.require('baiduLocation').startLocation({
            accuracy : accuracy,
            filter : filter,
            autoStop : autoStop
        }, function(ret, err) {
            if ( typeof callback == 'function') {
                callback(ret, err);
            }
        });
    },
    stopLocation : function() {
        api.require('baiduLocation').stopLocation();
    },
    getLocation : function(callback) {
        api.require('baiduLocation').getLocation(function(ret, err) {
            if ( typeof callback == 'function') {
                callback(ret, err);
            }
        });
    },
    covertLocation : function(appkey, lat, lng, callback) {
        var url = 'http://api.map.baidu.com/geocoder/v2/?ak=' + appkey + '&location=' + lat + ',' + lng + '&output=json&pois=0';
        $_http.get(url, function(ret) {
            if ( typeof callback == 'function') {
                callback(ret);
            }
        }, 'json');

    }
}
