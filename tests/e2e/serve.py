from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlsplit
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)
    def do_GET(self):
        path=urlsplit(self.path).path
        if path.endswith('.html'):
            self.send_response(301)
            self.send_header('Location',path[:-5] or '/')
            self.end_headers()
            return
        if path!='/' and (ROOT/(path.lstrip('/')+'.html')).is_file():
            self.path=path+'.html'
        super().do_GET()

ThreadingHTTPServer(('127.0.0.1',8788),Handler).serve_forever()
