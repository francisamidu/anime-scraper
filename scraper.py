from bs4 import BeautifulSoup
from config import *
from utils import *

scraped_anime_list = []

# Function to parse pagination links


def get_pagination_links(html_content):
    soup = BeautifulSoup(html_content, 'lxml')
    pagination_links = []
    try:
        pagination_elements = soup.find_all("ul", class_="pagination-list")
        for pagination_element in pagination_elements:
            for link in pagination_element.find_all("a"):
                pagination_links.append(f"{base_url}{link['href']}")
    except Exception as e:
        print(f"Error getting pagination links: {e}")
    return pagination_links

# Function to extract recently released anime


def get_recently_releases(html_content):
    soup = BeautifulSoup(html_content, 'lxml')
    try:
        latest_episodes_html = soup.find("div", class_="last_episodes")
        latest_episodes_list = latest_episodes_html.find_all(
            "li", selector="ul.items > li")
        for list_item in latest_episodes_list:
            name_item = list_item.find("p", class_="name")
            if name_item:
                link = name_item.find("a")
                item_element = {
                    "name": link.get("title"),
                    "episode_path": f"{base_url}{link.get("href").strip()}",
                    "episode_name": list_item.find(class_="episode").text.strip()
                }
                if english_regex.search(item_element["name"]) or japanese_regex.search(item_element["name"]):
                    scraped_anime_list.append(item_element)
    except Exception as e:
        print(f"Error getting recently released anime: {e}")
    return scraped_anime_list

# Main function


def main():
    html_content = get_html(base_url)
    if html_content:
        pagination_links = get_pagination_links(html_content)
        for link in pagination_links:
            page_content = get_html(link)
            if page_content:
                scraped_anime_list.extend(get_recently_releases(
                    page_content))  # Extend for cumulative results
                print(scraped_anime_list)
    # Process or store the scraped_anime_list as needed


if __name__ == "__main__":
    main()
