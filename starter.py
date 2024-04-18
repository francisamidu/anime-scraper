from requests_html import HTMLSession, HTML
from bs4 import BeautifulSoup

# base url
base_url = "https://gogoanime3.co/"

# anime list
anime_list = [
    {
        "english_name": "That time I got reincarnated as a slime",
        "japanese_name": "Tensei shitara Slime Datta Ken",
        "season":"3rd Season"
    },
    {
        "english_name":"Jobless Reincarnation",
        "japanese_name":"Mushoku Tensei",
        "season":"Isekai Ittara Honki Dasu"
    },
    {
        "english_name":"The Irregular at Magic High School",
        "japanese_name":"Mahouka Koukou no Rettousei",
        "season":"3rd Season"
    },
    {
        "english_name":"KonoSuba: God's Blessing on This Wonderful World",
        "japanese_name":"Kono Subarashii Sekai ni Shukufuku wo",
        "season":"3"
    }
]

# save fetched site into an html file
def save_html(html, path):
    with open(f"html/{path}.html", 'wb+') as f:
        f.write(html)

    print(f"Done saving file {html} to {path}")

# open saved html file
def open_html(path):
    with open(f"html/{path}.html", 'rb') as f:
        return f.read()

# get pagination links for html
def get_pagination_links(source):
    pagination_links_html_temp = HTML(html=(source)[0].html).find(".pagination-list")
    pagination_links_html = HTML(html=pagination_links_html_temp[0].html).find("li")
    for pagination_link in pagination_links_html:
        link_item = {
            'link': f"{base_url}{(pagination_link.find("a"))[0].attrs['href']}",
        }
        pagination_links.append(link_item)

# get annime list from html
def get_anime_list(source):
    wrapper = source.find("#wrapper_inside")
    latest_episodes_list_html = (wrapper[0].find(".last_episodes .items"))[0]

    latest_episodes_list = HTML(html=latest_episodes_list_html.html).find("li")
    item_elements = []
    for list_item in latest_episodes_list:
        img_item = (list_item.find(".img"))[0]
        item_element = {
            "name": (img_item.find("a"))[0].attrs['title'],
            "episode_path": f"{base_url}{(img_item.find("a"))[0].attrs['href']}",
            "episode_name": (list_item.find(".episode"))[0].text
        }
        item_elements.append(item_element)

    for item in item_elements:
        print(f"Name:{item['name']}")
        print(f"{item['episode_name']}")
        print(f"{item['episode_path']}")
        print("\n")


file = open_html('gogoanime')
# get home page
# session = HTMLSession()
# file = session.get("")

html = HTML(html=file)

# list_of_links = [base_url]
# load recent releases
recent_releases = html.find("#load_recent_release")

pagination_links = []
