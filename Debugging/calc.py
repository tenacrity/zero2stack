def perform_calculation(x, y, operand):
    op = get_operator(operand)
    if op is None:
        return "INVALID OPERAND"
    if operand == 'd' and y == 0:
        return "CANNOT DIVIDE BY ZERO"
    return op(x, y) 