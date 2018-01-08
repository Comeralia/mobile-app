import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name : "excludeNull"
})

export class ExcludeNull{
  transform(theArray, args){
		console.log(theArray)
		console.log(args)
		let myArray = []
		theArray.forEach((value,index)=>{
			console.log(value[args])
			if(value[args] !== null &&
				value[args] !== null &&
				value[args] !== ''){
				myArray.push(value)
			}
			console.log(myArray)
		});
    return myArray
  }
}

@Pipe({
	name:"returnDefault"
})
export class ReturnDefault{
	transform(n){
		if (n !== undefined && n !== '' && n !== 0){
			return n
		}else{
			return 'N/D'
		}
	}
}
