// http://keith-wood.name/datetimeEntry.html

// Datetimeentry
$(function eventDate() {
	// Day's short with number Month full Year and 24H

	$('#eventDate').datetimeEntry({datetimeFormat: ('W'+", "+'N'+' Y'), spinnerImage: ''});
	$('#eventDate').datetimeEntry('getDatetime');
	$('#eventDate').datetimeEntry('setDatetime');

		
	$('#eventTime').datetimeEntry({datetimeFormat: 'H:M',initialField:1, timeSteps: [1, 5, 0],spinnerImage: ''});
	$('#eventTime').datetimeEntry('getDatetime');
	$('#eventTime').datetimeEntry('setDatetime');
});

// Activity time entry
//$(function activityTime() {
//	$('#toFrom').datetimeEntry({datetimeFormat: 'w N Y H:M', timeSteps: [1, 5, 0]}).
//	$('#toTo').datetimeEntry({datetimeFormat: 'H:M', timeSteps: [1, 5, 0]}).
//	change(function() {
//		$('#' + (this.id === 'tFrom' ? 'tTo' : 'tFrom')).datetimeEntry(
//			'option', (this.id === 'tFrom' ? 'minTime' : 'maxTime'),
//			$(this).datetimeEntry('getDatetime')
//		);
//	
//	});
//});


$(function activityDurationTime() {
	// Day's short with number Month full Year and 24H
	$('#activityDuration').datetimeEntry({datetimeFormat: 'H:M', defaultDatetime:('00:00'),initialField:1,timeSteps: [1, 5, 0],spinnerImage: ''});
	$('#activityDuration').datetimeEntry('setDatetime', '00:00');
});



