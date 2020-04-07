const n = 124;

const answer = fib(n);

console.log(answer);

function fib(n) {
    
    if ( n === 2 ) return 1n;
    if ( n === 1 ) return 1n;
    if ( n === 0 ) return 0n;

    if ( n < 0 ) return fib_neg(n);
    
    const path = calculate_path(n);
    const steps = calculate_steps(path);

    console.log("Path:\n",  path);
    console.log("Steps:\n", steps);
     
    let memo = {
	1: { b: 1n, a: 0n }
    }
    
    function transform(val, op) {
	const { b, a } = memo[val];
	const { b: q, a: p } = memo[op];
	memo[val + op] = { b: q*a + (q + p)*b, a: p*a + q*b }; 
    }
    
    for (let i = 0; i < steps.length; i++) {
	transform(steps[i], path[i]) 
    }

    console.log("Memo:\n", memo);

    
    return memo[n].b;
}

function calculate_steps(path) {
    const steps = [];
    for (let i = 1; i < path.length; i++) {
	steps.push( path[i] - path[i - 1] );
    }
    return steps;
}

function fib_neg(n) {
    let current = 0n;
    let previous = 1n;
    let next;
    let i = 0;
    while ( i > n ) {
	next = previous - current;
	previous = current;
	current = next;
	i--;
    }
    return current;
}

function calculate_path(n) {
    const path = [n];
    while ( n > 1 ) {
	if ( is_even(n) ) n /= 2;
	else n -= 1;
	path.push(n);
    }
    return path.reverse();
}

function is_even(n) {
    return !(n % 2);
}
