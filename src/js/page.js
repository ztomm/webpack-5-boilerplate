module.exports = class Page {

	constructor() {
		this.apiButton();
		$('.webpack-work-flow').text('injected by es6 from /src/js');
	}

	apiButton() {
		$('button.api').on('click', function() {
			$.ajax({
				url: '/api/data-example',
				method: 'post',
				data: {
					say: utils.getHello(),
					again: 'again'
				},
			}).done(function (response) {
				$('.result').append(response);
			});
		});
	}

}
