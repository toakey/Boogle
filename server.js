const fs = require('fs');
const mysql = require('mysql2');
const levenshtein = require('js-levenshtein'); //used from Gustaf Andersson

const connection = mysql.createConnection({
	host: "localhost",
	user: "dumb_idiot",
	password: "chrisishot",
	database: "main"
});

const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const mustache = require('mustache-express');

////////////////////////////////////////////////////// login code credit to: Prashant Ram

const session = require('express-session')
const passport = require('passport')

var GoogleStrategy = require('passport-google-oauth2').Strategy;

//Middleware
app.use(session({
	secret: "secret",
	resave: false,
	saveUninitialized: true,
}))

app.use(passport.initialize()) // init passport on every route call
app.use(passport.session()) //allow passport to use "express-session"

//Get the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET from Google Developer Console
const GOOGLE_CLIENT_ID = "466258211-o3j9a276k1ltat5lh2ida7hk04gi3qgv.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

authUser = (request, accessToken, refreshToken, profile, done) => {
	return done(null, profile);
}

//Use "GoogleStrategy" as the Authentication Strategy
passport.use(new GoogleStrategy({
	clientID: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	callbackURL: "http://localhost:8080/auth/google/callback",
	passReqToCallback: true
}, authUser));


passport.serializeUser((user, done) => {
	// console.log(`\n--------> Serialize User:`)
	// console.log(user)
	// The USER object is the "authenticated user" from the done() in authUser function.
	// serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.  

	done(null, user)
})

passport.deserializeUser((user, done) => {
	// console.log("\n--------- Deserialized User:")
	// console.log(user)
	// user.balls = 2
	if (user.email == "toakey22@students.stab.org") {
		console.log("Hello, Admin");
	}

	currentUser = user;

	// This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
	// deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.

	done(null, user)
})

//console.log() values of "req.session" and "req.user" so we can see what is happening during Google Authentication
let count = 1
showlogs = (req, res, next) => {
	// console.log("\n==============================")
	// console.log(`------------>  ${count++}`)

	// console.log(`\n req.session.passport -------> `)
	// console.log(req.session.passport)

	// console.log(`\n req.user -------> `)
	// console.log(req.user)

	// console.log("\n Session and Cookie")
	// console.log(`req.session.id -------> ${req.session.id}`)
	// console.log(`req.session.cookie -------> `)
	// console.log(req.session.cookie)

	// console.log("===========================================\n")

	next()
}

app.use(showlogs);


app.get('/auth/google',
	passport.authenticate('google', {
		scope: ['email', 'profile']
	}));

app.get('/auth/google/callback',
	passport.authenticate('google', {
		successRedirect: '/w',
		failureRedirect: '/login'
	}));

//Define the Login Route
app.get("/login", (req, res) => {
	res.render('website', {})
})


//Use the req.isAuthenticated() function to check if user is Authenticated
checkAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect("/login")
}

//Define the Protected Route, by using the "checkAuthenticated" function defined above as middleware


//Define the Logout
app.post("/logout", (req, res) => {
	req.logOut()
	res.redirect("/website")
	console.log(`-------> User Logged out`)
})

//////////////////////////////////////////////////////
//trie
//////////////////////////////////////////////////////

//red flag system

app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.set("view engine", "mustache");
app.engine("mustache", mustache());

app.get('/', function(req, res) {
	res.render('website', {});
});

app.get('/bookofthemonth', checkAuthenticated, function(req, res) {
	res.render('bom', {});
});

app.get('/reviews', checkAuthenticated, function(req, res) {
	res.render('reviews', {
		"genres": [{
			"genre": "Adventure"
		}, {
			"genre": "Chills and Thrills"
		}, {
			"genre": "Detectives and Spies"
		}, {
			"genre": "Fast-Paced Action"
		}, {
			"genre": "Kids Outsmarting Adults"
		}, {
			"genre": "Mysterious"
		}, {
			"genre": "Mystery"
		}, {
			"genre": "Wilderness Survival"
		}, {
			"genre": "Animals (Realistic Fiction)"
		}, {
			"genre": "Our World (Fiction)"
		}, {
			"genre": "Sports (Fiction)"
		}, {
			"genre": "War (Fiction)"
		}, {
			"genre": "Other Historical Fiction"
		}, {
			"genre": "Other Realistic Fiction"
		}, {
			"genre": "Animals (Fantasy)"
		}, {
			"genre": "Contemporary Fantasy"
		}, {
			"genre": "Dystopian/Utopian"
		}, {
			"genre": "Epic Fantasy"
		}, {
			"genre": "Fairy Tales, Folk Lore, and Mythology"
		}, {
			"genre": "Adaptation or Alteration of Existing Story"
		}, {
			"genre": "Other Fantasy (General)"
		}, {
			"genre": "Other Science Fiction (General)"
		}, {
			"genre": "Religion or Cultural Traditions"
		}, {
			"genre": "Animals (Nonfiction)"
		}, {
			"genre": "Our World (Nonfiction)"
		}, {
			"genre": "Sports (Nonfiction)"
		}, {
			"genre": "War (Nonfiction)"
		}, {
			"genre": "Other Nonfiction (General)"
		}],
		"formats": [{
			"format": "Traditional Format"
		}, {
			"format": "Graphic Novel"
		}, {
			"format": "Comic Book"
		}, {
			"format": "Novel-in-cartoons"
		}, {
			"format": "Novel-in-verse"
		}, {
			"format": "Poetry"
		}, {
			"format": "Short Stories"
		}],
		"styles": [{
			"style": "Cliffhangers"
		}, {
			"style": "Confusing Clues"
		}, {
			"style": "Conversational (Narrator Talking With Reader)"
		}, {
			"style": "Dramatic Irony (Satire)"
		}, {
			"style": "Silly"
		}, {
			"style": "Multiple Narrators"
		}, {
			"style": "Old School"
		}, {
			"style": "Quick Cuts"
		}, {
			"style": "First Person Narration"
		}, {
			"style": "Third Person Narration"
		}],
		"themes": [{
			"theme": "Bravery"
		}, {
			"theme": "Change"
		}, {
			"theme": "Family Relationships"
		}, {
			"theme": "'Fitting In' vs. Belonging"
		}, {
			"theme": "Friendship"
		}, {
			"theme": "Good vs. Evil"
		}, {
			"theme": "Growing Up"
		}, {
			"theme": "Identity and Self"
		}, {
			"theme": "Inequality"
		}, {
			"theme": "Loss and Grief"
		}, {
			"theme": "Overcoming Adversity"
		}, {
			"theme": "Perserverance and Persistance"
		}, {
			"theme": "Redemption"
		}, {
			"theme": "Romance"
		}, {
			"theme": "School Experiences"
		}]
	});
});

app.get('/submitReview', checkAuthenticated, function(req, res) {

	let t = "";

	console.log(req.query.th1);

	if (req.query.th1 != "Select a theme!") {
		t = req.query.th1;
	}
	if (req.query.th2 != "Select a theme!") {
		t = t + "|" + req.query.th2;
	}
	if (req.query.th2 != "Select a theme!") {
		t = t + "|" + req.query.th3;
	}


	t = t.split("|");

	for (i in t) {
		if (t[i] == "") {
			t.shift();
		}
	}

	t = t.join("|");

	console.log(t);

	addUnmoderatedReview(req.query.t, t, req.query.r, req.query.g, req.query.f);

	res.redirect('w');
});

app.get('/moderateReview', checkAuthenticated, function(req, res) {

	let l = req.query.l;

	if (l == undefined) {
		l = "off";
	}

	console.log(l)

	console.log(req.query.approve);

	if (req.query.approve == "approved") {
		addReview(l, req.query.t, req.query.a, req.query.d, req.query.th, req.query.r, req.query.g, req.query.f);
	} else {}



	res.redirect('w');

	connection.query("DELETE FROM unmoderated where NAME = ?", [req.query.t], (err) => {});
});

app.get('/results', checkAuthenticated, async function(req, res) {
	// conduct the search

	let tempT = await accessThemes(req.query.query);
	tempT = tempT.split('|');
	tempT = tempT.join(', ');

	let tempG = await accessGenre(req.query.query);
	let tempSt = await accessFormat(req.query.query);

	let tempO = await recommend(req.query.query);
	tempO = tempO.join(', ');

	let tempR = await accessReviews(req.query.query);
	if (tempR != null) {
		tempR = tempR.split("|");

	} else {
		tempR = [];
	}

	res.render('results', {
		TITLE: req.query.query,
		AUTHOR: await accessAuthor(req.query.query),
		DESCRIPTION: await accessDescription(req.query.query),
		THEMES: tempT,
		GENRE: tempG,
		STYLE: tempSt,
		REVIEW1: tempR[0],
		REVIEW2: tempR[1],
		REVIEW3: tempR[2],
		REVIEW4: tempR[3],
		REVIEW5: tempR[4],
		REVIEW6: tempR[5],
		REVIEW7: tempR[6],
		REVIEW8: tempR[7],
		REVIEW9: tempR[8],
		REVIEW10: tempR[9],
		OTHERS: tempO
	});

});

app.get('/moderate', checkAuthenticated, async function(req, res) {
	let u = await grabUnmoderatedNames();
	console.log(u);

	let uu = []

	for (let i = 0; i < u.length; i++) {
		uu[i] = {
			"unmoderated": u[i]
		}
		console.log(uu);
	}

	res.render('moderate', {
		"unmoderateds": uu
	})
});

app.get('/approve', checkAuthenticated, async function(req, res) {
	let t = req.query.query;
	let th = await accessUnmoderatedThemes(req.query.query);
	th = th.split('|');
	th = th.join(' | ');
	let g = await accessUnmoderatedGenre(req.query.query);
	let f = await accessUnmoderatedFormat(req.query.query);
	let r = await accessUnmoderatedReviews(req.query.query);


	let l = await similarTo(req.query.query);
	console.log(l);

	let d = "";
	let a = "";

	if (levenshtein(t, l[0]) < 4) {
		d = "This book is probably already in the database! If you think it might not be, feel free to enter a description here!";
		a = "This book is probably already in the database! If you think it might not be, feel free to add the author here!";
	} else {
		d = "Add a description for the book here!";
		a = "Add the author's name here!"
	}

	res.render('approve', {
		TITLE: t,
		AUTHOR: a,
		DESCRIPTION: d,
		THEMES: th,
		GENRE: g,
		FORMAT: f,
		REVIEW: r,
		LIKELY: l[0]
	})
})

app.get('/search', checkAuthenticated, async function(req, res) {
	INPUT = req.query.query;

	let b = await similarTo(INPUT);

	res.render('search', {
		I: INPUT,
		BOOKS1: b[0],
		BOOKS2: b[1],
		BOOKS3: b[2],
		BOOKS4: b[3],
		BOOKS5: b[4],
		BOOKS6: b[5],
		BOOKS7: b[6],
		BOOKS8: b[7],
		BOOKS9: b[8],
		BOOKS10: b[9],
	})
});

app.get('/leavereview', checkAuthenticated, function(req, res) {
	res.render('leavereview', {});
});

app.get('/random', checkAuthenticated, function(req, res) {
	res.render('results', {});
});


let first_name;

app.get("/w", checkAuthenticated, async function(req, res) {


	let admin = ["toakey22@students.stab.org", "jpassmore@stab.org", "lfisher@stab.org", "eomalley23@students.stab.org"]

	let n = false;

	for (i in admin) {
		if (req.user.email == admin[i]) {
			n = true;
		}
	}

	if (n == false) {
		first_name = req.user.displayName.split(" ")[0];
	} else if (n == true) {
		first_name = "Admin"
	}

	res.render('w', {
		NAME: first_name,
		ADMIN: n,
	})
})



server.listen(8080, () => {
	console.log("Server is online");
});

/////////////////////////////////////////////////////////////////////////////////////////////

// let name = "Hatchet";
// let author = "L. Frank Baum";
// let description = "The Wonderful Wizard of Oz, children's book written by L. Frank Baum and first published in 1900. A modern fairy tale with a distinctly American setting, a delightfully levelheaded and assertive heroine, and engaging fantasy characters, the story was enormously popular and became a classic of children's literature.";
// let serialization = 0;
// let themesInputted = ["love,family,poverty,imperialism"];



// connection.query("SELECT ID FROM book where NAME = ?", [name], (err, entry) =>{
// 		if(entry.length == 0){
// 			connection.query("INSERT INTO book (name, author, description, serialization, themes) VALUES (?, ?, ?, ?, ?); ", [name, author, description, serialization, themesInputted], (err)=>{
// 			console.log(err);
// 			});
// 	} else {
// 		console.log("oopsie");

// 	}
// })

// connection.query("ALTER TABLE unmoderated ADD COLUMN reviews TEXT;", (err) => {});

connection.query("DELETE FROM book where id>89", (err) => {
	console.log(err);
});

// connection.query("ALTER TABLE unmoderated ADD COLUMN format TEXT");

// connection.query("UPDATE book SET author = ''",);
// connection.query("UPDATE book SET genre = ? where name=?;", ["Contemporary Fantasy", "Harry Potter and the Sorcerer's Stone"]);
// connection.query("UPDATE book SET themes = ? where name=?;", ["Bravery|Overcoming Adversity|Perserverance and Persistance", "Island: Book One: Shipwreck"]);

connection.query("SELECT * FROM book;", (err, books) => {
	console.log(books);
});

// connection.query("CREATE TABLE unmoderated (id INT AUTO_INCREMENT, name VARCHAR(255), author VARCHAR(255), description TEXT, serialization INT, PRIMARY KEY(id));")

// moderated("Hatchet");

//recommend style of storytelling

function recommend(book) {
	return new Promise((resolve, reject) => {
		connection.query("SELECT genre FROM book where name=?", [book], (err, g) => {
			let genre = g[0].genre;
			connection.query("SELECT themes FROM book where name= ?", [book], (err, themes) => {
				let importantThemes = themes[0].themes.split("|");
				console.log(importantThemes);

				let otherBooks = [];
				let otherOtherBooks = [];
				let recommendedBooks = [];
				let n = 0;

				connection.query("SELECT name FROM book where genre = ?", [genre], (err, otherNames) => {
					connection.query("SELECT themes FROM book where genre = ?", [genre], (err, otherThemes) => {

						for (i in otherNames) {
							if (otherNames[i].name != book) {
								otherBooks[i] = [otherNames[i].name, otherThemes[i].themes.split("|")];
							}
						}
						console.log(otherBooks);
						for (i in importantThemes) { //for each theme
							for (j in otherBooks) { //name of other book
								for (k in otherBooks[j][1]) { //k = theme of other book
									if (otherBooks[j][1][k] == importantThemes[i]) {
										let c = 0;
										for (l in recommendedBooks) {
											if (otherBooks[j][0] == recommendedBooks[l]) {
												c++;
											}

										}

										if (c == 0) {
											recommendedBooks[n] = otherBooks[j][0];
											n++;
										}
										c = 0;

									}
								}
							}
						}
						if (recommendedBooks.length > 1) {
							// console.log(recommendedBooks);
							resolve(recommendedBooks);
						} else {
							connection.query("SELECT name FROM book", (err, otherOtherNames) => {
								connection.query("SELECT themes FROM book", (err, otherOtherThemes) => {

									for (i in otherOtherNames) {
										if (otherOtherNames[i].name != book) {
											otherOtherBooks[i] = [otherOtherNames[i].name, otherOtherThemes[i].themes.split("|")];
										}
									}
									for (i in importantThemes) { //for each theme
										for (j in otherOtherBooks) { //name of other book
											let c = 0;
											for (k in otherOtherBooks[j][1]) { //k = theme of other book
												if (otherOtherBooks[j][1][k] == importantThemes[i]) {

													c++;



												}
											}
											if (c >= 2) {
												recommendedBooks[n] = otherOtherBooks[j][0];
												n++;
											}
											c = 0;
										}
									}
									if (recommendedBooks.length == 0) {
										recommendedBooks[n] = "(The library currently lacks books similar to '" + book + "'. We apologize for the inconvenience!)";
									} else if (recommendedBooks.length <= 2) {
										recommendedBooks[n] = "(Warning! These results may be incomplete or not entirely accurate!)";
									}

									resolve(recommendedBooks);
								})

							})
						}
					})

				})



			})
		})


	});

}



function accessDescription(book) {
	return new Promise((resolve, reject) => {
		connection.query("SELECT description FROM book where name=?", [book], (err, d) => {
			resolve(d[0].description);
		})
		// console.log(d);

	})
}

function accessAuthor(book) {
	return new Promise((resolve, reject) => {
		connection.query("SELECT author FROM book where name=?", [book], (err, d) => {
			resolve(d[0].author);
		})
		// console.log(d);

	})
}

function accessThemes(book) {
	return new Promise((resolve, reject) => {
		connection.query("SELECT themes FROM book where name=?", [book], (err, d) => {
			// console.log(d[0].themes);
			resolve(d[0].themes);
		})
		// console.log(d);

	})
}

function accessReviews(book) {
	return new Promise((resolve, reject) => {
		connection.query("SELECT reviews FROM book where name=?", [book], (err, d) => {
			// console.log(d[0].themes);
			resolve(d[0].reviews);
		})
		// console.log(d);

	})
}

function accessGenre(book) {
	return new Promise((resolve, reject) => {
		connection.query("SELECT genre FROM book where name=?", [book], (err, d) => {
			// console.log(d[0].themes);
			resolve(d[0].genre);
		})
		// console.log(d);

	})
}

function accessFormat(book) {
	return new Promise((resolve, reject) => {
		connection.query("SELECT format FROM book where name=?", [book], (err, d) => {
			// console.log(d[0].themes);
			resolve(d[0].format);
		})
		// console.log(d);

	})
}

function similarTo(input) {
	return new Promise((resolve, reject) => {

		let possibleResults = [];
		let n = 0;

		connection.query("SELECT name FROM book", (err, names) => {
			for (i in names) {

				possibleResults[n] = [];

				possibleResults[n][0] = names[i].name;
				possibleResults[n][1] = levenshtein(input, names[i].name);
				n++;

			}

			for (let i = 0; i < possibleResults.length; i++) {
				sortDaArray(possibleResults);
			}

			let results = [];

			for (let i = 0; i < 10; i++) {
				if (possibleResults[i] != null) {
					results[i] = possibleResults[i][0];
				}
			}

			resolve(results);
		})

	})
}

function sortDaArray(array) {
	for (let i = 0; i < array.length - 1; i++) {
		let purgatory;
		if (array[i][1] > array[i + 1][1]) {
			purgatory = array[i];
			array[i] = array[i + 1];
			array[i + 1] = purgatory;
		}
	}
}

function addUnmoderatedReview(t, th, r, g, f) {
	return new Promise((resolve, reject) => {
		connection.query("INSERT INTO unmoderated (name, themes, reviews, genre, format) VALUES (?, ?, ?, ?, ?);", [t, th, r, g, f], (err) => {})
	})
}

function addReview(existingBook, t, a, d, th, r, g, f) {
	return new Promise((resolve, reject) => {
		if (existingBook == "off") {
			connection.query("INSERT INTO book (name, author, description,themes, reviews, genre, format) VALUES (?, ?, ?, ?, ?, ?, ?);", [t, a, d, th, r, g, f], (err) => {
				console.log(t, a, d, th, r, g, f)
			})
		} else {
			console.log(t);
			sumReview(existingBook, r, th);
		}
	})
}

// sumReview('The God of Small Things', "new review");

function sumReview(t, r, th) {
	return new Promise((resolve, reject) => {

		connection.query("SELECT reviews FROM book where NAME = ?", [t], (err, d) => {
			console.log(d);
			let reviewArray = d[0].reviews;
			if (d[0].reviews == null) {
				reviewArray = r;
			} else {
				reviewArray = r + "|" + d[0].reviews;
			}
			console.log(reviewArray);
			connection.query("UPDATE book SET reviews =? where name=?", [reviewArray, t], (err) => {})
		});
		connection.query("SELECT themes FROM book where NAME =?", [t], (err, d) => {
			let themeArray = d[0].themes;
			th = th.split(' | ');
			themeArray = themeArray.split('|')
			themeArray = themeArray.join('|');
			if (d[0].themes == null) {
				th = th.join('|');
				themeArray = th;
			} else {
				for (i in themeArray) {
					for (j in th) {
						if (th[j] != themeArray[i]) {
							themeArray[themeArray.length] = th[j];
						}
					}
				}
			}
			console.log(themeArray);
			connection.query("UPDATE book SET themes =? where name=?", [themeArray, t], (err) => {})
		});



	})
}

function grabUnmoderatedNames() {
	return new Promise((resolve, reject) => {
		connection.query("SELECT name FROM unmoderated", (err, names) => {
			let nn = [];
			for (i in names) {
				nn[i] = names[i].name;
			}
			resolve(nn);
		})
	})
}

function accessUnmoderatedThemes(book) {
	return new Promise((resolve, reject) => {
		connection.query("SELECT themes FROM unmoderated where name=?", [book], (err, d) => {
			// console.log(d[0].themes);
			resolve(d[0].themes);
		})
		// console.log(d);

	})
}

function accessUnmoderatedReviews(book) {
	return new Promise((resolve, reject) => {
		connection.query("SELECT reviews FROM unmoderated where name=?", [book], (err, d) => {
			// console.log(d[0].themes);
			resolve(d[0].reviews);
		})
		// console.log(d);

	})
}

function accessUnmoderatedGenre(book) {
	return new Promise((resolve, reject) => {
		connection.query("SELECT genre FROM unmoderated where name=?", [book], (err, d) => {
			// console.log(d[0].themes);
			resolve(d[0].genre);
		})
		// console.log(d);

	})
}

function accessUnmoderatedFormat(book) {
	return new Promise((resolve, reject) => {
		connection.query("SELECT format FROM unmoderated where name=?", [book], (err, d) => {
			// console.log(d[0].themes);
			resolve(d[0].format);
		})
		// console.log(d);

	})
}

// let input = "";
// input = input.split(" ");
// let book = input[0];
// let themes = [];
// for(let i = 1; i < input.length; i++){

// 	themes[i-1] = input[i];

// }

// console.log(book, themes);

// add();
// themesBook("survival");

// function add(){

// 	let prev = fs.readFileSync("./book-themes");
// 	fs.writeFileSync("./book-themes",  prev + book + "|" + themes + "\n");
// 	console.log(fs.readFileSync("./book-themes").toString());

// }



// function themesBook(t){
// 	let index = fs.readFileSync("./book-themes").toString();
// 	// console.log(index);
// 	index = index.split("\n"); //separates entries
// 	let books = [];

// 	for (let title = 0; title < index.length; title++){
// 		index[title] = index[title].split("|"); //separates books and themes, 

// 		let themeIn = false;


// 			index[title][1] = index[title][1].split(","); //separates themes



// 			for(let theme = 0; theme < index[title][1].length; theme++){

// 				console.log(index[title][0],theme,index[title][1][theme]);

// 				if(index[title][1][theme] == t){
// 					themeIn = true;
// 				}


// 		}

// 		let n = books.length;

// 		if(themeIn == true){
// 			books[n] = " " + index[title][0];
// 		}

// 	}
// 	for(let i = 0; i < books.length; i++){
// 		books[i] = books[i].split("_");
// 		books[i] = books[i].join(" ");
// 	}

// 	console.log(`Books with theme "${t}" include: "${books}`);
// }