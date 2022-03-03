How to Run:
	To run the website make sure you have installed:
		Node JS
		Python 3.6+
		PIP
	Also virtualenv is recomended

	Two command consols are needed: 
		one to run the front end, React
		one to tun the back end, Flask
	Starting with the back end it is recomended to create a virtual environment by moving to a 
	desired directory and running the command:
		virtaulenv venv
	This will create a virtual envirnoment in the directory venv
	To start the virtual directory on linux/mac run the command:
		/venv/bin/activate
	To start the virtual directory on windows command propmt runt the command:
		\venv\Scripts\activate.bat
	To start the virtual directory on windows powershell run the command:
		.\venv\Scripts\activate
	Now use pip to install the required libraries by using the requirements.txt and running the command:
		pip install -r requirements.txt
	Now go to the driectory where flask is located in react-flask-app/api by running the command:
		cd react-flask-app/api
	Finaly start the backend by executing the command:
		flask run
	
	To start the front end use the other command console
	For the front end go to the react-flask-app directory by running the command:
		cd react-flask-app
	Now to start the front end run the command:
		npm start

	Simply open a browser to the address: 
		localhost:3000

Project Description:
	For this Project I used React for the front end, Flask for the back end, and sqlite3 for the database.
	The directory react-flask-app contains the .js files needed for the front end and inside the directory
	api is the .py file that runs the backend, api, and acesses the database students.db

	By default any changes to the database will persist, to rebuild the database in the api.py file in the 
	api directory change the variable recreateDB at line 8 to True, this will delete the previous database
	and populate it with the default rows on each restart flask.

	api.py has 4 main functions that are executed when the front end accesses /add, /remove, /update, and /data
	/add takes the posted json and adds a new row to the database
	/remove removes the posted id of the row te be removed
	/update updates the row with the posted id with the posted attributes
	/data gives a JSON array of all the rows in the database

	App.js along with the files in the components directory generates the UI manages backend calls 
	to do what the UI requests