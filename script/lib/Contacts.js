var $Contacts = {
    select : function(callback) {
        api.require('contacts').select( function(ret, err) {
            if ( typeof callback == 'function') {
                callback(ret, err);
            }
        });
    }
}
