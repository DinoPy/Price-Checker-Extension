- Find out how to split the product items into individual components :checked:
- Find a way to call from the product component a function in the parent one to
  act as a remove function. :checked:
- Look into animations for on mount and on unmount - functional but with weird
  behavior :checked:
- Find a way to refetch on demand - maybe move the query to individual product
  page where that will be rendered using only the URL and skeleton and
  following loading population of the page :checked:
- Find a way to do a mass refetch on demand.
- Create skeletons for loading :checked:
- Find a way to save previous product price :checked:
- Look into a different way of scraping that hopefully is less likely to cause
  a human check - found optimal way but still doesn't avoid robot check.
- Save URLs to localStorage :checked:
- Find a way to get the response cookies and apply them to future fetches to
  the same store;
- Delete URL from input once scraped.
- Add a little bit of error handler :checked: - receiving error on frontend +
  removal of url from list.
- Check for .app_tag with content "Violent" -> update value of age input and
  submit - see what happens.
- Move skeleton to new component. :checked:
- Update skeleton CSS to some relative format.
- Loop over the list and check if each string includes the new url
- Add a better error handling and 2 more attempts at getting a response before
  deletion.
- Add different color if new price is different than the old one. :checked:
- Save the prices so they will only refetch once every x hours if triggered or
  on manual refetch.
- Add a PopUp div where multiple errors can stack, add removal animation,
  ensure multi pop up un related to a single variable works.
- Add date the price was last updated. If the item was just added and there was
  no price update then we should say Added: {date when added} if the price was
  updated for any of the products then say Updated: {date when it was last
  updated}
- On error, make the container remain visible with an error symbol or hint if
  there was previous content and isn't a new product.
- Locate price and icons in the same container so they don't overflow each other.
- Update the font size so it can go smaller at very small screens
- Add epic games free as new container
- Make epic container stack
- Clean CSS selectors

- Try fetching data from the websites using node JS. :checked:
- Consider using cron to fetch the data from the websites while offline and
  only return it on fetch??

