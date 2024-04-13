## price-and-volume
React frontend and Node.js/Express/Postgres backend app for viewing candle and 
volume charts for entered stock ticker symbols.

Getting Started
1) Clone this repo
    git clone https://github.com/mkaleski/price-and-volume.git  

2) cd into the "backend" directory, install required packages, create and seed  
    database, and start the server. (Make sure that you have postgreSQL installed).   
    The postgreSQL start command is: sudo /etc/init.d/postgresql start  

3) cd backend

4) npm install

5) createdb ticker and ticker_test db's and seed with the following command:  
    psql < ticker.sql  
    -- This will create db's, tables and seed.

6) nodemon server.js  
    This will start the server on port 3001

7) cd into the "frontend" directory, install required packages, then start the app  
    a)  cd frontend

    b)  npm install

    c) npm start  
    This will run your app on http://localhost:3000

App Information  
Routes  
Path	    Component  
/	        Home  
/signup	  Register  
/login	  Login  
/ticker   ticker input screen  
/profile	Profile  

Component Architecture    
App  
├── Navigation  
└─┬ Routes  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─┬ Ticker  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp; └── ApexCharts  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── Home  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─┬ Signup  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp; └── Alert  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├─┬ Login  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ └── Alert  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── PrivateRoute  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─┬ Profile  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── Alert

API: https://marketstack.com/  
API URL:  `http://api.marketstack.com/v1/eod?access_key=${access_key}&symbols=${symbols}&date_from=${getStartDate()}&date_to=${getToday()}`  
END Point: http://localhost:3001/ticker/api/data/

Charts:  Apex Charts.  https://apexcharts.com/docs/react-charts/  

Testing:  /backend/npm test

