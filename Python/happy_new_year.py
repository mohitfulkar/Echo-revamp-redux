#  I have taken the code from the chatgpt !!!!
#  I have modified it to suit my needs !!!!
import time
import sys
sys.stdout.reconfigure(encoding='utf-8')

# Fun countdown function
def countdown():
    print("Get ready for the New Year Countdown! 🎆")
    for i in range(5, 0, -1):
        sys.stdout.write(f"\rCountdown: {i} seconds")
        sys.stdout.flush()
        time.sleep(1)
    print("\n🎉 Happy New Year! 🎉")

# Display fireworks effect
def fireworks():
    print("\n✨ Fireworks Show! ✨")
    firework_patterns = [
        "💥      🌟     💥",
        "    🌟  💥   🌟",
        "       🌟 🌟",
        "🎆   💥    🎆",
    ]
    for _ in range(5):
        for pattern in firework_patterns:
            sys.stdout.write(f"\r{pattern}")
            sys.stdout.flush()
            time.sleep(0.5)
        print("")

# Main program
if __name__ == "__main__":
    countdown()
    fireworks()
    print("Wishing you a year full of joy, success, and happiness! 🥳")
