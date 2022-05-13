/* eslint-disable no-unused-vars */
/**
 * Show sucess icon for 'showFor' ms
*/
async function showSuccessCheck(showFor, cb){
	$('#check').fadeTo('fast',1);
	await new Promise(e => {return setTimeout(e, showFor);});	
	$('#check').fadeOut('fast',()=>{
		if (cb){
			cb();
		}
	});
	
}

/**
 * fadeIn loader in 'fadeTime
*/
function showLoader(fadeTime){
	$('#spinner').fadeTo(fadeTime,1);
	
}

/**
 * Wait 'wait' ms, then fadeOut in 'fadeTime
*/
async function hideLoader(fadeTime, wait, cb){
	await new Promise(e => {return setTimeout(e, wait);});	
	$('#spinner').fadeOut(fadeTime,0, ()=>{
		if (cb){
			cb();
		}
	});
	
}