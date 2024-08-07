# teams-transcript
If you have access to a Teams transcript, you can view it, but Microsoft makes it really hard to actually get all of it downloaded. This is a bare bones snippet I use occasionally to programatically interact with the DOM in order to get a transcript into a single document.

Using this:
- Go to the page with the video/transcript side by side.
- Paste this snippet into your dev console (see major caveats, this is *terrible* advice)

The high level overview of code:
- Attach a mutation observer for additions to the DOM.
  - On each mutation, check if the divs containing the transcript text have been added to.
  - If so, grab the transcript text from the DOM, and append it to a long string.
- Programmatically scroll the transcript
  - There's a hard coded "amount" and "frequency", high amount and low frequency will scroll faster. Scroll too fast and you'll miss parts of the transcript. Adjust these if things are missing.
  - I scroll for up to 100 seconds. That works for my cases.

## Major Caveats:
- You should never put code you don't understand in your console. That said, use this by pasting it into your console.
- This depends on query selectors, classes, and IDs for the current Microsoft Teams app. It will break the second any of these change.
- This will not scale well for very large transcirpts. 2 speakers for 90 minutes seems to work fine.
- I've not tested this in any way beyond my own minimal use cases. YMMV
