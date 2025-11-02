function main()
{
    let i=1;
    while(i<5)
    {
        console.log("usha");
        i++;
    }
}main();

console.log("================")

function main()
{
    let i=1;
    while(i<=5)
    {
        ++i;
        console.log(i);
        i++;
    }
}main();

console.log("================")

//count digits in a number
let n=31224;
let count=0;
while(n>0)
{
    n=Math.trunc(n/10);
    count++;
}
console.log(count);


