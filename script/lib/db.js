var $db = {
    open : function(name, path, callback) {
        api.require('db').openDatabase({
            name : name,
            path : path
        }, function(ret, err) {
            if ( typeof callback == 'function') {
                callback(ret, err);
            }
        });
    },
    close : function(name, callback) {
        api.require('db').closeDatabase({
            name : name
        }, function(ret, err) {
            if ( typeof callback == 'function') {
                callback(ret, err);
            }
        });
    },
    transaction : function(name, operation, callback) {
        api.require('db').transaction({
            name : name,
            operation : operation
        }, function(ret, err) {
            if ( typeof callback == 'function') {
                callback(ret, err);
            }
        });
    },
    execute : function(name, sql, callback) {
        api.require('db').executeSql({
            name : name,
            sql : sql
        }, function(ret, err) {
            if ( typeof callback == 'function') {
                callback(ret, err);
            }
        });
    },
    select : function(name, sql, callback) {
        api.require('db').selectSql({
            name : name,
            sql : sql
        }, function(ret, err) {
            if ( typeof callback == 'function') {
                callback(ret, err);
            }
        });
    }
}
