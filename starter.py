from requests_html import HTMLSession, HTML
from time import sleep
from pprint import pp
from pyquery import PyQuery

# global variables for base Url, Anime List, Scraped Animes, Pagination links
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
item_elements = []
pagination_links = []

# save fetched site into an html file


def save_html(html, path):
    with open(f"html/{path}.html", 'wb+') as f:
        f.write(html)

    pp(f"Done saving file {html} to {path}")

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

    pagination_elements = source.html.find("ul.pagination-list")

    # Filter out any empty elements (assuming empty elements have no child elements)

    pagination_elements = [
        element for element in pagination_elements if element.children]
    # pagination_links_html = HTML(
    #     html=pagination_links_html_temp[0].html).find("li")
    # for pagination_link in pagination_links_html:
    #     link_item = {
    #         'link': f"{base_url}/{(pagination_link.find("a"))[0].attrs['href']}",
    #     }
    #     pagination_links.append(link_item)
    # sleep(10)

# get anime list from html


def get_anime_list(source, class_name):

    wrapper = source.find("#wrapper_inside")
    latest_episodes_list_html = None

    if (class_name == "latest"):
        latest_episodes_list_html = (
            wrapper[0].find(".last_episodes .items"))[0]
        latest_episodes_list = HTML(
            html=latest_episodes_list_html.html).find("li")

        for list_item in latest_episodes_list:
            img_item = (list_item.find(".img"))[0]
            item_element = {
                "name": (img_item.find("a"))[0].attrs['title'],
                "episode_path": f"{base_url}{(img_item.find("a"))[0].attrs['href']}",
                "episode_name": (list_item.find(".episode"))[0].text
            }
            item_elements.append(item_element)
    elif class_name == "popular":
        popular_updates_list_html = (
            wrapper[0].find(".added_series_body ul li"))[0]
        popular_updates_list = HTML(
            html=popular_updates_list_html.html
        ).find("li")
        for list_item in popular_updates_list:
            updates_list_item = (list_item.find("a"))[0]
            item_element = {
                "name": updates_list_item.attrs['title'],
                "episode_path": f"{base_url}{updates_list_item.attrs['href']}",
                "episode_name": ""
            }
            item_element["episode_path"] = item_element["episode_path"].replace(
                "-dub", "")
            item_elements.append(item_element)

    elif class_name == "recent":
        recently_added_list = (wrapper[0].find(
            ".added_series_body .listing li"))
        for list_item in recently_added_list:
            recent_list_item = (list_item.find("a"))[0]
            item_element = {
                "name": recent_list_item.attrs['title'],
                "episode_path": f"{base_url}{recent_list_item.attrs['href']}",
                "episode_name": ""
            }

            item_elements.append(item_element)


# file = open_html('gogoanime')
# get home page
try:
    session = HTMLSession()
    file = session.get(base_url)
    file.html.render(keep_page=True, timeout=30)

except Exception as e:
    pp(f"Something awful happened and your request failed, here is your full error: {
       e}")

save_html(file.content, 'gogoanime')


html = HTML(html=open_html('gogoanime'))


# list_of_links = [base_url]
# load recent releases and ongoing anime updates
recent_releases = html.find(".main_body #load_recent_release")
popular_update = html.find(".pagination-list")

# get_pagination_links(recent_releases, "")
get_pagination_links(html)
# get_anime_list(html, "latest")
# get_anime_list(html, "popular")
# get_anime_list(html, "recent")
# pp(pagination_links)
