import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChangeDetectionStrategy } from "@angular/core";
import { Observable } from 'rxjs';
import { Utilities } from "../../models/utilities";

var MIN_LENGTH = 25;
var FILLER_PHRASE = "(Free Space)";

interface SelectedIndices {
	[ key: string ]: boolean;
}

@Component({
  selector: 'app-bingo-board',
  inputs: [ "phrases" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bingo-board.component.html',
  styleUrls: ['./bingo-board.component.scss']
})
export class BingoBoardComponent {
  
  @Input() phrases: string[];
  @Output() userWinEvent = new EventEmitter<boolean>();

	public selectedIndices: SelectedIndices;
	public spaces: string[];
	public gameWon: boolean = false;
	public lines = [
		[0,5,10,15,20],
		[1,6,11,16,21],
		[2,7,11,17,22],
		[3,6,12,18,23],

		[0,1,2,3,4],
		[5,6,7,8,9],
		[10,11,12,13,14],
		[15,16,17,18,19],
		[20,21,22,23,24],
		
		[4,8,12,16,20],
		[0,6,12,18,24]
	  ];
	constructor() {

		this.phrases = [];
		this.selectedIndices = Object.create( null );
		this.spaces = [];

	}
	public ngOnChanges() : void {
		this.selectedIndices = Object.create( null );
		this.spaces = this.selectRandomPhrases();
		this.selectedIndices[12]=true;
	}

	public toggleIndex( index: number ) : void {
		if(index == 12) return;
		this.selectedIndices[ index ] = ! this.selectedIndices[ index ];
		this.gameWon = !!this.calculateWinner();
		if(this.gameWon){this.userWinEvent.emit(this.gameWon);}
	}
	private selectRandomPhrases() : string[] {
		var selectedPhrases = this.phrases.slice();
		while ( selectedPhrases.length < MIN_LENGTH ) {
			selectedPhrases.push( FILLER_PHRASE );
		}
		return( Utilities.arrayShuffle( selectedPhrases ).slice( 0, MIN_LENGTH ) );

	}

	public calculateWinner() {
		  for(let i = 0; i< this.lines.length; i++) {
			var [a, b, c, d, e] = this.lines[i];
			if(
			  this.selectedIndices[a] && 
			  this.selectedIndices[b] &&
			  this.selectedIndices[c] &&
			  this.selectedIndices[d] &&
			  this.selectedIndices[e] 
			) {
				this.lines.splice(i, 1);
			  return true;
			}
		  }
		  return null;
		}

}
