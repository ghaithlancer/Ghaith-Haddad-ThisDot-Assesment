This code demonstrates how to use the Github V3 API to retrieve a list of all users on Github.

The API call used is: https://api.github.com/search/users?q

And it can only retrieve basic info about each user such as:

    - Login/username
    - followers url
    - following url
    - organizations url
    - repos url

Which is what is being displayed in each user card. You can click any user card profile picture and it will open a new window for that user displaying all public info related to that user.
The same goes for the card buttons.

Now although the search results count might be much higher than what's shown. But that's due to the fact that the api call simply has to be run again if you wanted to get lets say the 2nd page of the results. Which is why I configured it to display the first 100 users.

I'll be more than happy to explain further as to why I made this decision.
