var $FNImageClip = {
	open : function(rect, srcPath, style, mode, fixedOn, callback) {
		api.require('FNImageClip').open({
			rect : rect,
			srcPath : srcPath,
			style : style,
			mode : mode,
			fixedOn : fixedOn
		}, function(ret, err) {
			if ( typeof callback == 'function') {
				callback(ret, err);
			}
		});
	},
	save : function(destPath, copyToAlbum, quality, callback) {
		api.require('FNImageClip').save({
			destPath : destPath,
			copyToAlbum : copyToAlbum,
			quality : quality
		}, function(ret, err) {
			if ( typeof callback == 'function') {
				callback(ret, err);
			}
		});
	},
	close : function() {
		api.require('FNImageClip').close();
	},
	reset : function() {
		api.require('FNImageClip').reset();
	}
}
