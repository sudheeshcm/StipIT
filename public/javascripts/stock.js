$('#stock').autocomplete({
	source: function( request, response ) {
		$.ajax({
			url : '/stockAutofill',
			dataType: "json",
			data: {
				name_startsWith: request.term,
				type: 'stock_symbol'
			},
			success: function( data ) {
				response( $.map( data, function( item ) {
					return {
						label: item.stock_name,
						value: item.stock_name
					}
				}));
			}
		});
	},
	autoFocus: true,
	minLength: 0      	
});

$('#createTip').bind('click', function(){
	$.ajax({
		url : 'index.php?model=StockTip&action=add',
		dataType: "json",
		data: {
			stock : document.getElementById("stock").value,
			callType: document.getElementById("callType").value,
			target_price: document.getElementById("target_price").value,
			stop_loss: document.getElementById("stop_loss").value,
			time: document.getElementById("time").value,
			time_period: document.getElementById("time_period").value,
		},
		success: function( data ) {
			alert(data);
		},
		error : function (error) {
			
		}
	});

	return false;
});
