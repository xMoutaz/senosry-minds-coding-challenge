export class Utilities {

	static arrayShuffle<T>( collection: T[] ) : T[] {

		var length = collection.length;

		for ( var i = 0 ; i < length ; i++ ) {

			var swapIndex = Utilities.randRange( 0, ( length - 1 ) );

			if ( swapIndex !== i ) {

				Utilities.arraySwap( collection, i, swapIndex );

			}

		}

		return( collection );

	}


	static arraySwap<T>( collection: T[], i: number, j: number ) : T[] {

		var temp = collection[ j ];
		collection[ j ] = collection[ i ];
		collection[ i ] = temp;

		return( collection );

	}


	static base64UrlDecode( encodedValue: string ) : string {

		var decodedValue = encodedValue
			.replace( /-/g, "+" )
			.replace( /_/g, "/" )
		;

		return( window.atob( decodedValue ) );

	}


	static base64UrlEncode( value: string ) : string {

		var encodedValue = window.btoa( value )
			.replace( /\+/g, "-" )
			.replace( /\//g, "_" )
			.replace( /=+$/, "" )
		;

		return( encodedValue );

	}


	static randRange( min: number, max: number ) : number {

		return( min + Math.floor( ( max - min + 1 ) * Math.random() ) );
		
	}

}