from requests_html import HTML, HTMLSession
from time import sleep
from pprint import pp
import re

# global variables
session = HTMLSession()
base_url = "https://gogoanime3.co"
anime_list = [
    {
        "english_name": "That time I got reincarnated as a slime",
        "japanese_name": "Tensei shitara Slime Datta Ken",
        "season": "3rd Season"
    },
    {
        "english_name": "Jobless Reincarnation",
        "japanese_name": "Mushoku Tensei",
        "season": "Isekai Ittara Honki Dasu"
    },
    {
        "english_name": "The Irregular at Magic High School",
        "japanese_name": "Mahouka Koukou no Rettousei",
        "season": "3rd Season"
    },
    {
        "english_name": "KonoSuba: God's Blessing on This Wonderful World",
        "japanese_name": "Kono Subarashii Sekai ni Shukufuku wo",
        "season": "3"
    }
]
pagination_links = []
newly_released_animes = []
scraped_anime_list = []

# Extract english and japanese names from anime_list
english_names = [anime.get("english_name", "") for anime in anime_list]
japanese_names = [anime.get("japanese_name", "") for anime in anime_list]

# Construct regular expression patterns
english_pattern = r"(?i)\b{}\b".format("|".join(map(re.escape, english_names)))
japanese_pattern = r"(?i){}(?: |$)".format(
    "|".join(map(re.escape, japanese_names)))

# save fetched site into an html file


def save_html(html, path):
    with open(f"html/{path}.html", 'wb+') as f:
        f.write(html)

    pp(f"Done saving file")

# open saved html file


def open_html(path):
    try:
        with open(f"html/{path}.html", 'rb') as f:
            return f.read()
    except:
        pp(f"Couldnt open file with path {path}")
        return ""

# get pagination links for html


def get_pagination_links(source):
    # Get all UL elements with the class "pagination-list"
    try:
        html = HTML(html=source.html)
        pagination_elements = html.find(".pagination-list")
        pagination_links_html = HTML(
            html=pagination_elements[0].html).find("li")
        for pagination_link in pagination_links_html:
            link_item = {
                'link': f"{base_url}/{(pagination_link.find("a"))[0].attrs['href']}",
            }
            pagination_links.append(link_item)
    except Exception as E:
        pp(f"Couldnt get pagination links: {E}")
    sleep(10)

# get all recently released animes


def get_recently_releases():
    try:
        for link in pagination_links:
            res = session.get(link.get("link"))
            page = HTML(html=res.content)
            latest_episodes_list = page.find(
                "div.last_episodes > ul.items > li")
            for list_item in latest_episodes_list:
                img_item = (list_item.find(".img"))[0]
                item_element = {
                    "name": (img_item.find("a"))[0].attrs['title'],
                    "episode_path": f"{base_url}{(img_item.find("a"))[0].attrs['href']}",
                    "episode_name": (list_item.find(".episode"))[0].text
                }
                if (re.search(english_pattern, item_element.get("name")) is not None) or (re.search(japanese_pattern, item_element.get("name")) is not None):
                    scraped_anime_list.append(item_element)
            sleep(10)
    except Exception as e:
        pp(f"Failed to get recent releases - {e}")

# get anime list from html


def get_anime_list(source):
    class_names = ["recent release", "recently added"]

    wrapper = source.find("#wrapper_inside")
    recently_added_list = (wrapper[0].find(
        ".added_series_body .listing li"))
    for list_item in recently_added_list:
        recent_list_item = (list_item.find("a"))[0]
        item_element = {
            "name": recent_list_item.attrs['title'],
            "episode_path": f"{base_url}{recent_list_item.attrs['href']}",
            "episode_name": ""
        }

        scraped_anime_list.append(item_element)


# get page html


def get_html():
    try:
        file = session.get(base_url)
        save_html(file.content, "gogoanime")
    except Exception as e:
        pp(e)

# Main function


def init():
    # get_html()

    html = HTML(html=open_html('gogoanime'))
    get_pagination_links(html)
    get_recently_releases()


# Starting point
init()
