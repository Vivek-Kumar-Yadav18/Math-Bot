import math
import re

def greet_user():
    """Welcome message for the user"""
    print("=" * 50)
    print("🤖 Welcome to Simple Math Bot!")
    print("=" * 50)
    print("I can help you with:")
    print("• Basic math (+, -, *, /)")
    print("• Powers (2^3 = 8)")
    print("• Square root (sqrt 16)")
    print("• Trigonometry (sin, cos, tan)")
    print("• Logarithms (log 100, log2 8)")
    print("• Area calculations")
    print("• Simple interest")
    print("• LCM and HCF")
    print("Type 'quit' to exit")
    print("=" * 50)

def basic_calculator(expression):
    """Calculate basic math expressions"""
    try:
        # Replace ^ with ** for power
        expression = expression.replace('^', '**')
        # Remove spaces
        expression = expression.replace(' ', '')
        # Calculate the result
        result = eval(expression)
        return f"Result: {result}"
    except:
        return "❌ Sorry, I couldn't calculate that. Please check your expression."

def calculate_power(base, exponent):
    """Calculate power of a number"""
    try:
        result = base ** exponent
        return f"{base}^{exponent} = {result}"
    except:
        return "❌ Error calculating power"

def calculate_square_root(number):
    """Calculate square root"""
    try:
        if number < 0:
            return "❌ Cannot calculate square root of negative number"
        result = math.sqrt(number)
        return f"√{number} = {result}"
    except:
        return "❌ Error calculating square root"

def calculate_area(shape, dimensions):
    """Calculate area of different shapes"""
    try:
        if shape == "circle":
            radius = dimensions[0]
            area = math.pi * radius * radius
            return f"Area of circle with radius {radius} = {area:.2f}"
        
        elif shape == "square":
            side = dimensions[0]
            area = side * side
            return f"Area of square with side {side} = {area}"
        
        elif shape == "rectangle":
            length, width = dimensions[0], dimensions[1]
            area = length * width
            return f"Area of rectangle {length} × {width} = {area}"
        
        elif shape == "triangle":
            base, height = dimensions[0], dimensions[1]
            area = 0.5 * base * height
            return f"Area of triangle (base={base}, height={height}) = {area}"
        
        else:
            return "❌ Shape not supported"
    except:
        return "❌ Error calculating area"

def calculate_interest(principal, rate, time):
    """Calculate simple interest"""
    try:
        interest = (principal * rate * time) / 100
        total = principal + interest
        return f"Simple Interest: ${interest:.2f}\nTotal Amount: ${total:.2f}"
    except:
        return "❌ Error calculating interest"

def find_lcm_hcf(numbers):
    """Find LCM and HCF of numbers"""
    try:
        # Find HCF (GCD)
        def gcd(a, b):
            while b:
                a, b = b, a % b
            return a
        
        # Find LCM
        def lcm(a, b):
            return abs(a * b) // gcd(a, b)
        
        if len(numbers) < 2:
            return "❌ Need at least 2 numbers"
        
        # Calculate HCF
        hcf = numbers[0]
        for num in numbers[1:]:
            hcf = gcd(hcf, num)
        
        # Calculate LCM
        lcm_result = numbers[0]
        for num in numbers[1:]:
            lcm_result = lcm(lcm_result, num)
        
        return f"HCF: {hcf}\nLCM: {lcm_result}"
    except:
        return "❌ Error calculating LCM/HCF"

def extract_numbers(text):
    """Extract numbers from text"""
    numbers = re.findall(r'\d+', text)
    return [int(num) for num in numbers]

def extract_decimal_numbers(text):
    """Extract decimal numbers from text"""
    numbers = re.findall(r'\d+\.?\d*', text)
    return [float(num) for num in numbers]

def calculate_trigonometry(text):
    """Calculate trigonometric functions"""
    try:
        # Look for patterns like sin(30), cos(45), tan(60)
        trig_pattern = r'(sin|cos|tan|sec|cosec|cot)\(?(\d+\.?\d*)\)?'
        match = re.search(trig_pattern, text.lower())
        
        if not match:
            return "❌ Please use format: sin(30), cos(45), tan(60)"
        
        function = match.group(1)
        angle_degrees = float(match.group(2))
        angle_radians = math.radians(angle_degrees)
        
        # Calculate trigonometric values
        if function == "sin":
            result = math.sin(angle_radians)
        elif function == "cos":
            result = math.cos(angle_radians)
        elif function == "tan":
            result = math.tan(angle_radians)
        elif function == "sec":
            result = 1 / math.cos(angle_radians)
        elif function == "cosec":
            result = 1 / math.sin(angle_radians)
        elif function == "cot":
            result = 1 / math.tan(angle_radians)
        else:
            return "❌ Function not supported"
        
        return f"{function}({angle_degrees}°) = {result:.4f}"
    
    except Exception as e:
        return f"❌ Error calculating {function}: {e}"

def calculate_logarithm(text):
    """Calculate logarithms"""
    try:
        # Look for patterns like log(100), log2(8), ln(10)
        log_pattern = r'(log|ln)(\d+)?\(?(\d+\.?\d*)\)?'
        match = re.search(log_pattern, text.lower())
        
        if not match:
            return "❌ Please use format: log(100), log2(8), ln(10)"
        
        log_type = match.group(1)
        base_str = match.group(2)
        number = float(match.group(3))
        
        if number <= 0:
            return "❌ Cannot calculate log of zero or negative number"
        
        if log_type == "ln":
            # Natural logarithm (base e)
            result = math.log(number)
            return f"ln({number}) = {result:.4f}"
        
        elif log_type == "log":
            if base_str:
                # Custom base logarithm
                base = float(base_str)
                if base <= 0 or base == 1:
                    return "❌ Invalid base for logarithm"
                result = math.log(number, base)
                return f"log{base}({number}) = {result:.4f}"
            else:
                # Base 10 logarithm
                result = math.log10(number)
                return f"log({number}) = {result:.4f}"
        
        else:
            return "❌ Logarithm type not supported"
    
    except Exception as e:
        return f"❌ Error calculating logarithm: {e}"

def main():
    """Main function to run the chatbot"""
    greet_user()
    
    while True:
        # Get user input
        user_input = input("\nYou ➤ ").strip().lower()
        
        # Check if user wants to quit
        if user_input in ['quit', 'exit', 'bye']:
            print("👋 Goodbye! Thanks for using Math Bot!")
            break
        
        # Handle different types of math questions
        try:
            # Basic calculations (+, -, *, /, ^)
            if any(op in user_input for op in ['+', '-', '*', '/', '^']):
                print("🤖", basic_calculator(user_input))
            
            # Square root
            elif 'sqrt' in user_input or 'root' in user_input:
                numbers = extract_numbers(user_input)
                if numbers:
                    print("🤖", calculate_square_root(numbers[0]))
                else:
                    print("🤖 Please provide a number for square root")
            
            # Area calculations
            elif any(word in user_input for word in ['area', 'circle', 'square', 'rectangle', 'triangle']):
                numbers = extract_numbers(user_input)
                if 'circle' in user_input and numbers:
                    print("🤖", calculate_area("circle", numbers))
                elif 'square' in user_input and numbers:
                    print("🤖", calculate_area("square", numbers))
                elif 'rectangle' in user_input and len(numbers) >= 2:
                    print("🤖", calculate_area("rectangle", numbers))
                elif 'triangle' in user_input and len(numbers) >= 2:
                    print("🤖", calculate_area("triangle", numbers))
                else:
                    print("🤖 Please provide dimensions for the shape")
            
            # Interest calculation
            elif 'interest' in user_input:
                numbers = extract_numbers(user_input)
                if len(numbers) >= 3:
                    print("🤖", calculate_interest(numbers[0], numbers[1], numbers[2]))
                else:
                    print("🤖 Please provide Principal, Rate, and Time")
            
            # LCM and HCF
            elif any(word in user_input for word in ['lcm', 'hcf', 'gcd']):
                numbers = extract_numbers(user_input)
                if numbers:
                    print("🤖", find_lcm_hcf(numbers))
                else:
                    print("🤖 Please provide numbers for LCM/HCF")
            
            # Trigonometry
            elif any(word in user_input for word in ['sin', 'cos', 'tan', 'sec', 'cosec', 'cot']):
                print("🤖", calculate_trigonometry(user_input))
            
            # Logarithms
            elif any(word in user_input for word in ['log', 'ln']):
                print("🤖", calculate_logarithm(user_input))
            
            # Help
            elif user_input in ['help', '?']:
                greet_user()
            
            # Default response
            else:
                print("🤖 I didn't understand that. Try:")
                print("   • 2 + 3 * 4")
                print("   • 5^3")
                print("   • sqrt 16")
                print("   • sin(30)")
                print("   • log(100)")
                print("   • area of circle 5")
                print("   • interest 1000 5 2")
                print("   • lcm 12 18")
                print("   • Type 'help' for more options")
        
        except Exception as e:
            print(f"🤖 Oops! Something went wrong: {e}")

# Run the chatbot
if __name__ == "__main__":
    main() 