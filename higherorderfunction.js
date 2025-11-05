 calc(10,20,add);
        calc(10,20,sub);
        calc(10,20,mul);
        function calc(n1,n2,calType){
            let res=calType(n1,n2);
            console.log(res);
        }
        function add(a,b){
            return a+b;
        }
        function sub(a,b){
            return a-b;
        }
        function mul(a,b)
        {
          console.log(a*b);
        }

        let arr=[12,15,16,7,20,40];
        let res=arr.filter(function test(ele)
        {
            if(ele%2==0)
            return ele;
        }
    );
    console.log(res);

   