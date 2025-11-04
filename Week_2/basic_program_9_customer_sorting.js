let customers = [{Name:"A", token:2}, {Name:"B", token:1}, {Name:"C", token:4}, {Name:"D", token:3}];
customers.sort((a, b) => a.token - b.token);
console.log("Customers sorted by token:", customers);
//console.log("Customers sorted by token:", customers);