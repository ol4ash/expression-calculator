function eval(innerExpr) {
	for (let i=1; i<innerExpr.length-1; i++){
    	if (innerExpr[i]=="*"){
            let next=(parseFloat(innerExpr[i-1])*parseFloat(innerExpr[i+1]));
    		innerExpr.splice(i-1, 3, next);
    		i=0;
    	}
    	else if (innerExpr[i]=="/"){
			if (innerExpr[i+1]==0){
				throw new TypeError("TypeError: Division by zero.");
			}
			else {
				let next=(parseFloat(innerExpr[i-1])/parseFloat(innerExpr[i+1]));
				innerExpr.splice(i-1, 3, next);
				i=0;
			}
    	}
	}
	for (let i=1; i<innerExpr.length-1; i++){
    	if (innerExpr[i]=="+"){
            let next=(parseFloat(innerExpr[i-1])+parseFloat(innerExpr[i+1]));
    		innerExpr.splice(i-1, 3, next);
    		i=0;
    	}
    	else if (innerExpr[i]=="-"){
			let next=(parseFloat(innerExpr[i-1])-parseFloat(innerExpr[i+1]));
			innerExpr.splice(i-1, 3, next);
			i=0;
		}
	}

    return innerExpr[0];
}


function expressionCalculator(expr) {
	
	expr = expr.replace("+", " + ");
    expr = expr.replace("-", " - ");
    expr = expr.replace("/", " / ");
    expr = expr.replace("*", " * ");
    expr = expr.replace("(", " ( ");
    expr = expr.replace(")", " ) ");

	let exprArr=expr.split(' ');

	for (let i=0; i<exprArr.length; i++){
    	if ((exprArr[i]==" ")||(exprArr[i]=="")){
    		exprArr.splice(i,1)
    		i=-1;
    	}
    }
    exprArr.unshift("(");
    exprArr.push(")");
    
    let start;
	let end;

	for (let i=0; i<exprArr.length; i++){
		if (exprArr[i] =="("){
			start=i;
		}
		if ((exprArr[i] ==")")&&(typeof start == 'number')){
			end =i;
			let innerExpr=exprArr.slice(start+1,end);
			exprArr.splice(start, innerExpr.length+2, eval(exprArr.slice(start+1,end)));
			i=-1;
			start="";
			end="";
		}
	}
	console.log(exprArr[0]);

	if ((exprArr.length!=1)||(isNaN(exprArr[0]))){
		throw new TypeError("ExpressionError: Brackets must be paired");
	}
	else {
		return exprArr[0];
	}

	
}	

module.exports = {
    expressionCalculator
}