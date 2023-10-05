This repository is if you want to submit patches, issues, or questions.

You can run `keyboardsine.html` on its own; no other files are necessary. The downside is that the timbre is a sine wave with latency, because of CORS issues.

If you want the cool piano timbre, it's more complicated. Download the repository; all the files are needed except `README.md`. Run `corsplease.py` to set up a local webserver, then visit `http://127.0.0.1:8000/keyboard.html` in your web browser. See [this page](https://docs.python.org/3/library/http.server.html#http-server-security) for security considerations of running a local webserver. Only your own computer can connect to this server; other computers on your network cannot. So if you're not running untrusted programs, it should be safe.