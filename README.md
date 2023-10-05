The presentation is at https://ad8e.pages.dev/keyboard. This repository is for patches, issues, discussions, questions, etc.

`keyboard.html` can run locally. The downside is that the timbre is a sine wave with 10-20 ms latency, because [your browser isn't nice about locally downloaded files](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements). If you want to avoid this latency, then just visit [the original webpage](https://ad8e.pages.dev/keyboard).

If you want to both avoid latency and run the keyboard locally:

1. Download the repository
2. In a console, run `./corsplease.py` if you're on Linux, or `python3 corsplease.py` if you're on Windows. This sets up a local webserver to handle CORS, which makes your browser happy.
3. Visit `http://127.0.0.1:8000/keyboard.html` in your web browser.

See [this page](https://docs.python.org/3/library/http.server.html#http-server-security) for security considerations of running a local webserver. Only your own computer can connect to this server; other computers on your network cannot. So if you're not running untrusted programs, it should be safe.

If you don't want a lot of files making a mess of your directory, then download `keyboardsine.html` on its own. It doesn't need any of the other files. This file only has the sine wave timbre, with the latency.