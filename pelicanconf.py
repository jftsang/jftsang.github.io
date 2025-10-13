from pathlib import Path

AUTHOR = 'J. M. F. Tsang'
SITENAME = 'JMFT'
SITEURL = "https://jmft.dev"
SITEDESCRIPTION = "Thoughts on software engineering, physics, teaching and music."

PATH = "content"
STATIC_PATHS = ['images', 'static']
EXTRA_PATH_METADATA = {'static/favicon.ico': {'path': 'favicon.ico'}}

# THEME = Path(__file__).parent / "pelican-themes" / "Flex"
THEME = Path(__file__).parent / "theme"
THEME_COLOR = "dark"

TIMEZONE = 'Europe/London'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

LINKS = (
    ("Categories", "/categories.html"),
    ("Tags", "/tags.html"),
    ("Hamster", "https://elderberri.es/"),
)

# Social widget
SOCIAL = (
    ("at", "mailto:j_dot_m_dot_f_dot_tsang_at_cantab_dot_net"),
    ("bluesky", "https://bsky.app/profile/jmft.dev"),
    ("linkedin", "https://www.linkedin.com/in/joanna-tsang-bb2059171/"),
    ("github", "https://github.com/jftsang"),
)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

PLUGIN_PATHS = ['pelican-plugins', 'pelican-commonmark']
PLUGINS = [
    "pelican_commonmark",
    "render_math",
]

MARKDOWN = ['codehilite(noclasses=True, pygments_style=native, linenums=True)', 'extra',
            'header_id']  # enable MD options

USE_LESS = True
USE_GOOGLE_FONTS = True
