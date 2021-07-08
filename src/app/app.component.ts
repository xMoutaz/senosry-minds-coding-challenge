import { Component, ElementRef, Renderer2 } from '@angular/core';

import { Utilities } from "./models/utilities";
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  
	public mode: Mode;
	public phrases: string[];
	public screenshotUrl: string;
	public gameWon: boolean = false;
	public clicked = false;

  constructor(private renderer2: Renderer2,
    private elementRef: ElementRef) {

		this.mode = "play";
		this.screenshotUrl = "";
		this.phrases = [
			"Child Noises in the background",
			"Hello, hello",
			"I need to jump in another call",
			"Can everyone go on mute",
			"Could you please get closer to the mic",
			"load painful echo/feedback",
			"Next slide please",
			"Can we tak this offline",
			"is Moutaz on the call",
			"Could you share this slides afterwords?",
			"Can somebody grant presenter rights?",
			"Can you email taht to everyone?",
			"Kids yelling in background",
			"Sorry, I had problems loggin in",
			"Animal noises in the background",
			"Sorry, I didn't found the conference id",
			"I was having connection issues",
			"I will have to get back to you",
			"Who just joined?",
			"Sorry, something with my calender",
			"do you see my screen?",
			"Lets wait for ___!",
			"You will send the minues?",
			"Sorry, I wan on mute!"
		];

	}

	public surprise(): void {

		const canvas = this.renderer2.createElement('canvas');
	
		this.renderer2.appendChild(this.elementRef.nativeElement, canvas);
	
		const myConfetti = confetti.create(canvas, {
		  resize: true
		});
	
		myConfetti();
		setTimeout(() => {
			this.renderer2.removeChild(this.elementRef.nativeElement, canvas)
		  }, 
		  3000)
	  }

	public applyNewPhrases( newPhrases: string[] ) : void {

		this.phrases = newPhrases;
		this.mode = "play";
		this.savePhrasesToUrl();

	}


	public gotoMode( newMode: Mode ) : void {

		this.mode = newMode;

	}


	public ngOnInit() : void {
		this.applyHash( window.location.hash.slice( 1 ) );
	}

	private applyHash( base64Value: string ) : void {
		if ( ! base64Value ) {
			this.savePhrasesToUrl();
			return;
		}
		try {
			this.phrases = Utilities.base64UrlDecode( base64Value )
				.split( /&/g )
				.map(
					( rawPhrase: any ) => {
						return( decodeURIComponent( rawPhrase ) );
					}
				)
				.filter(
					( phrase: any ) => {
						return( !! phrase );
					}
				)
			;

		} catch ( error ) {
			console.group( "Error decoding URL" );
			console.error( error );
			console.groupEnd();
		}

	}
	private savePhrasesToUrl() : void {
		var encodedPhrases = this.phrases
			.map(
				( phrase ) => {
					return( encodeURIComponent( phrase ) );
				}
			)
			.join( "&" );
		window.location.hash = Utilities.base64UrlEncode( encodedPhrases );
	}

	
}

type Mode = "edit" | "play";