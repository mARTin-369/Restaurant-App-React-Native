def checkVarVal(stack,varTBF):
    currStackSize = len(stack)
    temp = currStackSize - 1
    while(temp>=0):
        t = stack[temp]
        y=t.split()
        if(y[0]  == varTBF):
            return int(y[1])
        temp -=1 
    return 'undefined'



def solve (N, command):
    # Your code goes here
    resArr = []
    cust_stack = []
    for i in command:
        if( i == "{"):
            cust_stack.append(i)
                    
        elif( i.find("assign") != -1):
            y = i.split()
            cust_stack.append(" ".join(y[1:]))
        elif( i == "}"):
            #Popping until we find {
            while(cust_stack[-1] != "{"):
                cust_stack.pop()

            #we need to pop { this as well
            cust_stack.pop()
        else:
            res = checkVarVal(cust_stack,str(i.split()[1]))
            resArr.append(res)
    return resArr

N = int(input())
command = []
for _ in range(N):
    command.append(input())

out_ = solve(N, command)
print ('\n'.join(map(str, out_)))