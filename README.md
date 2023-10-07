The presentation is at https://ad8e.pages.dev/keyboard. This repository is for patches, issues, discussions, questions, etc.

`keyboard.html` can run locally. The downside is that the timbre is a sine wave with 10-20 ms latency, because [your browser isn't nice about locally downloaded files](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements). To avoid this latency, just visit [the original webpage](https://ad8e.pages.dev/keyboard).

If you want to both avoid latency and run the keyboard locally:

1. Download the repository
2. Open a console. If you're on Linux, run `./corsplease.py`. If you're on Windows, run `python3 corsplease.py`. This sets up a local web server to handle CORS, which makes your browser happy.
3. Visit `http://127.0.0.1:8000/keyboard.html` in your web browser.

See [this page](https://docs.python.org/3/library/http.server.html#http-server-security) for security considerations of running a local web server. Only your own computer can connect to this server; other computers on your network cannot. So if you're not running untrusted programs, it should be safe.