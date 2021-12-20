# This is a wikipedia-web-scraping project.

The project takes the starting link -i.e- https://www.wikipedia.org/
and automatically navigates to the wikipedia page for the letter P, (It's my initial).

It scrapes the top 3 sections on the wikipedia page listed as 
1. History
2. Use In Writing System -> 2.1. Music
3. Related characters 

You can check the actual page on the below given link:
https://en.wikipedia.org/wiki/P

After scraping these 3 things, the script stores this data in an excel file by the name of P_Data_On_Wikipedia.xlsx, which is not present already will be created in the same folder where these 3 scripts are present.

# To start, run the file named LinkGame.js using the following command:

node LinkGame.js

### Note:
The script is designed to use request, cheerio and xlsx modules. So in order to run this script you have to install them too.

To install these modules, just run the following command:

npm install request cheerio xlsx
