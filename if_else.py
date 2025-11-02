name=input("Enter your name: ")
age=int(input("Enter your age: "))
salary=int(input("Enter your salary: "))
if age>=25 or salary>=50000:
    print("Account holder:", name)
    print("You are eligible for loan")
else:
    print("Account holder:", name)
    print("Not eligible for loan")