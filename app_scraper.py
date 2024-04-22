from bs4 import BeautifulSoup


def open_html(path):
    try:
        with open(f"html/{path}.html", 'rb') as f:
            return f.read()
    except:
        print(f"Couldnt open file with path {path}")
        return ""


file = open_html("gogoanime")
html = BeautifulSoup(file)

latest_episodes = html.find_all(class_="last_episodes")
print(latest_episodes)
