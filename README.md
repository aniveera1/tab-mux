# tab-mux

## Deploying
1. `git clone https://github.com/aniveera1/tab-mux.git`
2. Go to `chrome://extensions/` and enable `Developer Mode` in the upper-right corner
3. Click `load unpacked` option on the left-hand side and select the tab-mux directory

## Usage
1. Open a window with any number of tabs
2. Use the keyboard shortcut `cmd-shift-s` which will: let you enter a name for the current window, save/minimize the current window, and open a new one
3. In the new window click on the tab-mux extension icon to reveal all the saved windows
4. Click on any saved window to bring it back into focus

## Proof-of-Concept
This hacky prototype reveals that Chrome API's expose enough functionality to implement a sufficiently useful Chrome extension for the purposes of tab management.
The prototype was built with an end product idea of an extension that would enable users to save snapshots of various window configurations with different tabs.
These saved snapshots would then be offloaded to reduce RAM usage, minimized, and a new window would open to enable the user to start working on a new context.
These saved snapshots would appear whenever the user clicked on the tab-mux extension icon, and clicking on a saved snapshot would bring the window and all relevant tabs back into focus.

## Next Steps
Since questions surrounding the feasibilty of the application have been answered, the next step is to scope the actual product and nail down some requirements. This code wasn't written for the purpose of being extended or reused in any major capacity, so no hard feelings if the product direction pivots drastically from the purposed idea above.
