$.ajax({
	url:"https://api.kooritea.cc/get_img",
	type:"get",
	dataType:"json",
}).done(function (json) {
    var data=json;
    obj=JSON.parse(data);
}).fail(function( xhr, status, errorThrown ) {
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
})
  .always(function( xhr, status ) {
    alert( "The request is complete!" );
});
