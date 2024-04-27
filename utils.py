import requests
from config import anime_list
import re


def get_html(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise exception for non-200 status codes
        return response.content
    except requests.exceptions.RequestException as e:
        print(f"Error getting HTML content for {url}: {e}")
        return None


def compile_regex(items, case_insensitive=True):
    pattern = r"(?i)" if case_insensitive else ""
    pattern += "|".join(map(re.escape, items))
    return re.compile(pattern)


english_regex = compile_regex(
    [anime.get("english_name", "") for anime in anime_list], True)
japanese_regex = compile_regex(
    [anime.get("japanese_name", "") for anime in anime_list], True)
