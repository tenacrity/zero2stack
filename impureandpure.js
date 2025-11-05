 //impure function
        let sum=0;
        function add(a,b){
            sum+=(a+b);
            return sum;
        }
        console.log(add(1,2));
        console.log(add(1,2));

//pure function

        function add(a,b){
        return a+b;
        }
    
        console.log(add(1,2));
        console.log(add(1,2));