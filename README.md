This repository is if you want to submit changes. I'll probably say yes.

The timbre is a sine wave rather than the cool detuned piano, since I wrote the piano in C++. But that requires an extra compile step with emscripten, and then you also need to have a local webserver and set up CORS headers. You probably don't want to bother with all that stuff. The sine wave is good enough.

That unfortunately means the player piano doesn't work either since it's also in C++. :(