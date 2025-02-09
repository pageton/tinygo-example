package main

// This calls a JS function from Go.
func main() {}

//export multiply
func multiply(x, y int) int {
    return x * y;
}

//export divide
func divide(x, y int) int {
		return x / y;
}

//export add
func add(x, y int) int {
		return x + y;
}

//export subtract
func subtract(x, y int) int {
	return x - y;
}

//export power
func power(x, y int) int {
	result := 1
	for i := 0; i < y; i++ {
		result *= x
	}
	return result
}

//export factorial
func factorial(x int) int {
	if x == 0 {
		return 1
	}
	return x * factorial(x-1)
}
