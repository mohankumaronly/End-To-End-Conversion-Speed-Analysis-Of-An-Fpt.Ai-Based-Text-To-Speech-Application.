import os, random, subprocess, datetime
from plyer import notification

# === CONFIG ===
REPO_PATH = r"C:\Users\user\OneDrive\Desktop\Development\college_tts_project"
TARGET_FILE = "index.js"  # change this to your main file

# === Realistic comments added to file ===
DUMB_COMMENTS = [
    "// small tweak to function",
    "// quick note to self",
    "// temporary log for debugging",
    "// just adjusting formatting",
    "// another minor improvement",
    "// updated for better readability",
    "// check this part again later",
    "// random update on startup"
]

# === Realistic human commit messages ===
HUMAN_MESSAGES = [
    "fixed small issue with logic",
    "updated minor code formatting",
    "refactored small part for clarity",
    "improved readability of section",
    "added tiny debug comment",
    "cleaned up a few lines",
    "made a minor syntax correction",
    "slight improvement before next feature",
    "tweaked variable naming consistency",
    "quick cleanup commit",
    "adjusted comment wording",
    "misc minor change before work starts",
    "forgot to push earlier small fix",
    "tiny housekeeping update",
    "minor code polish"
]

def run(cmd):
    subprocess.run(cmd, shell=True, cwd=REPO_PATH, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

def modify_file():
    file_path = os.path.join(REPO_PATH, TARGET_FILE)
    with open(file_path, "a", encoding="utf-8") as f:
        f.write("\n" + random.choice(DUMB_COMMENTS) + "\n")

def commit_and_push():
    msg = random.choice(HUMAN_MESSAGES).capitalize() + " (" + datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") + ")"
    run("git add .")
    run(f'git commit -m "{msg}"')
    run("git push")
    notification.notify(title="✅ Auto Commit", message=msg, timeout=5)
    print("Committed:", msg)

def main():
    modify_file()
    commit_and_push()

if __name__ == "__main__":
    main()
