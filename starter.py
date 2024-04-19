from requests_html import HTMLSession, HTML
from bs4 import BeautifulSoup
from pprint import pp

# base url
base_url = "https://gogoanime3.co"

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
item_elements = []
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
            'link': f"{base_url}/{(pagination_link.find("a"))[0].attrs['href']}",
        }
        pagination_links.append(link_item)

# get anime list from html
def get_anime_list(source,class_name):
    
    wrapper = source.find("#wrapper_inside")
    latest_episodes_list_html = None
    
    if(class_name == "latest"):
        latest_episodes_list_html = (wrapper[0].find(".last_episodes .items"))[0]
        latest_episodes_list = HTML(html=latest_episodes_list_html.html).find("li")
    
        for list_item in latest_episodes_list:
            img_item = (list_item.find(".img"))[0]
            item_element = {
                "name": (img_item.find("a"))[0].attrs['title'],
                "episode_path": f"{base_url}{(img_item.find("a"))[0].attrs['href']}",
                "episode_name": (list_item.find(".episode"))[0].text
            }
            item_elements.append(item_element)
    elif class_name == "popular":       
        popular_updates_list_html = (wrapper[0].find(".added_series_body ul li"))[0]
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
            item_element["episode_path"] = item_element["episode_path"].replace("-dub","")
            item_elements.append(item_element)
            
    elif class_name =="recent":
        popular_updates_list_html = (wrapper[0].find(".added_series_body .listing li"))[0]
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
            
            item_elements.append(item_element)
         

file = open_html('gogoanime')
# get home page
# session = HTMLSession()
# file = session.get(base_url)
# save_html(file.content,'gogoanime')

html = HTML(html=file)

# list_of_links = [base_url]
# load recent releases and ongoing anime updates
recent_releases = html.find("#load_recent_release")
popular_update = html.find("#load_popular_ongoing")

pagination_links = []
# get_pagination_links(recent_releases)
# get_pagination_links(popular_update)
# get_anime_list(html, "latest")
# get_anime_list(html, "popular")
get_anime_list(html, "recent")
pp(item_elements)