#!/usr/bin/env python3
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler, test
import sys

class CORSRequestHandler (SimpleHTTPRequestHandler):
    def end_headers (self):
        #self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")

        SimpleHTTPRequestHandler.end_headers(self)

if __name__ == '__main__':
    test(CORSRequestHandler, ThreadingHTTPServer, protocol="HTTP/1.1", port=int(sys.argv[1]) if len(sys.argv) > 1 else 8000, bind = '127.0.0.1')