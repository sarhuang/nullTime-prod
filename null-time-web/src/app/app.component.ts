import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'null-time';
	ngOnInit(): void {
		//document.body.style.backgroundImage = "url('assets/images/red_swirl_bg.jpg')";
	}
}
