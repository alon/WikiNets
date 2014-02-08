function expandX(Sid){
	var coll = false;
	if($("#"+Sid+"_c").css('display')=='block') coll = true;
	collapseAll(Sid)
	// give class
	if(!coll){
		$("#"+Sid+"_c").css('display','block');
		$('#'+Sid).css('background-image',$('#'+Sid).css('background-image').replace('black','blue').replace('gray-dark','blue'));
		$('#'+Sid).css('background-repeat','no-repeat');
	}
}

function collapseAll(Sid){
	$('.toolboxpopout').css('display','none');
	$('.toolboxpopout').css('background-image',$('#'+Sid).css('background-image').replace('blue','gray-dark'));
	$('.toolboxpopout').css('background-repeat','no-repeat');
}

('.toolboxitempopout').onclick(function(){
	expandX(this.attr('id'));
});