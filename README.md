This repository is if you want to submit patches, issues, or questions.

You can run `keyboardsine.html` on its own; no other files are necessary. The timbre is a sine wave, because of CORS issues. There's some latency.

If you want the cool piano timbre, it's more complicated. Download the repository, run `corsplease.py` to set up a local webserver, then visit `http://127.0.0.1:8000/keyboard.html` in your web browser. See [this page](https://docs.python.org/3/library/http.server.html#http-server-security) for security considerations of running a local webserver. Only your own computer can connect to this server; other computers on your network cannot.