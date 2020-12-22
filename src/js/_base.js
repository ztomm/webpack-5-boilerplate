import '../css/_base.scss';

import $ from 'jquery';

import Utils from './utils';
import Page from './page';

window.onload = function () {

	// assuming script gets uglified: window ensures access from other files/classes
	window.utils = new Utils();
	// otherwise declare as const
	// const utils = new Utils();

	window.page = new Page();

}
