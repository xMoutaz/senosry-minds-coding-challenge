import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { SimpleChanges } from "@angular/core";

@Component({
  selector: 'app-form',
  inputs: [ "phrases" ],
	outputs: [ "phrasesChangeEvents: phrasesChange" ],
	changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

	public options: PhraseOption[];
	public phrases: string[];
	public phrasesChangeEvents: EventEmitter<string[]>;

	constructor() {

		this.options = [];
		this.phrases = [];
		this.phrasesChangeEvents = new EventEmitter();

	}

	public addOption() : void {

		var nextID = this.options.length;

		this.options.push({
			id: nextID,
			name: `phrase_${ nextID }`,
			value: ""
		});

	}

	public addOptions() : void {

		for ( var i = 0 ; i < 5 ; i++ ) {

			this.addOption();

		}

	}

	public ngOnInit() : void {

		this.options = this.phrases.map(
			( phrase, index ) => {

				return({
					id: index,
					name: `phrase_${ index }`,
					value: phrase
				});

			}
		);

		while ( this.options.length < 25 ) {

			this.addOption();

		}

	}

	public processForm() : void {

		var newPhrases = this.options
			.map(
				( option ) => {

					return( option.value.trim() );

				}
			)
			.filter(
				( phrase ) => {

					return( !! phrase );

				}
			)
		;

		this.phrasesChangeEvents.emit( newPhrases );
	}

}


interface PhraseOption {
	id: number;
	name: string;
	value: string;
}
