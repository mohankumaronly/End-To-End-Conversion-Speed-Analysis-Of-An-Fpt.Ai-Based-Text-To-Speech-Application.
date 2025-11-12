import os, random, time, datetime, subprocess
from plyer import notification

# === CONFIG ===
REPO_PATH = r"C:\Users\user\OneDrive\Desktop\Development\college_tts_project"
TARGET_FILE = "index.js"  # or main.py, app.js, etc.
SLEEP_MIN = 3600      # 1 hour
SLEEP_MAX = 14400     # 4 hours
MESSAGES = [
    "Fix minor typo", "Refactor small part", "Add small log",
    "Tiny improvement", "Code cleanup", "Update comment line"
]

DUMB_COMMENTS = [
    "// just a dumb comment",
    "# random note here",
    "// minor change for testing",
    "# auto commit tweak",
    "// slight update"
]

def run(cmd):
    subprocess.run(cmd, shell=True, cwd=REPO_PATH, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

def modify_file():
    path = os.path.join(REPO_PATH, TARGET_FILE)
    with open(path, "a", encoding="utf-8") as f:
        f.write("\n" + random.choice(DUMB_COMMENTS) + "\n")

def notify(title, msg):
    notification.notify(title=title, message=msg, timeout=5)

def commit_changes():
    msg = random.choice(MESSAGES) + " – " + datetime.datetime.now().strftime("%H:%M:%S")
    run("git add .")
    run(f'git commit -m "{msg}"')
    run("git push")
    notify("✅ Auto Commit Done", msg)

def main():
    while True:
        modify_file()
        commit_changes()
        sleep_time = random.randint(SLEEP_MIN, SLEEP_MAX)
        print(f"Next commit in {sleep_time//3600}h {(sleep_time%3600)//60}m")
        time.sleep(sleep_time)

if __name__ == "__main__":
    main()
