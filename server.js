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

let currentUser;

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
	// console.log(`-------> User Logged out`)
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

app.get('/user', checkAuthenticated, async function(req, res) {

	let g = await gatherGenres();
	let f = await gatherFormats();
	let th = await gatherThemes();

	// console.log(g);

	let r = [];
	let rr = [];

	let y = await occurenceSort(await recommendUserGenre(g[0], th))
	let z = await occurenceSort(await recommendUserFormat(f[0], th))


	if (g != null && f != null && th != null) {
		for (let i = 0; i < 15; i++) {
			if(y[i] != null){ 
				r[i] = y[i][0];
			}
		}

		for (let i = 0; i < 15; i++) {
			if(z[i] != null){ 
				rr[i] = z[i][0];
			}
		}
	}



	// g[0] = '"' + g[0];
	// f[0] = '"' + f[0];
	// th[0] = '"' + th[0];
	// g[2] = g[2] + '"';
	// f[2] = f[2] + '"';
	// th[4] = th[4] + '"';
	g = g.join(', ');
	f = f.join(', ');
	th = th.join(', ');

	r = r.join(', ');
	rr = rr.join(', ');
	// console.log(r);

	res.render('user', {
		NAME: currentUser.displayName,
		GENRES: g,
		FORMATS: f,
		THEMES: th,
		GRECS: r,
		FRECS: rr
	});
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

	// console.log(req.query.th1);

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

	// console.log(t);

	addUnmoderatedReview(req.query.t, t, req.query.r, req.query.g, req.query.f, currentUser.email);

	res.redirect('w');
});

app.get('/moderateReview', checkAuthenticated, function(req, res) {

	let l = req.query.l;

	if (l == undefined) {
		l = "off";
	}

	// console.log(req.query.u);

	if (req.query.approve == "approved") {
		addReview(l, req.query.t, req.query.a, req.query.d, req.query.th, req.query.r, req.query.g, req.query.f);
		// console.log(req.query.u, req.query.g, req.query.th, req.query.f);
		updateUser(req.query.u, req.query.g, req.query.th, req.query.f);
	} else {

	}

	res.redirect('w');

	connection.query("DELETE FROM unmoderated where name = ? AND user = ?", [req.query.t, req.query.u], (err) => {});
});

app.get('/results', checkAuthenticated, async function(req, res) {
	// conduct the search

	let tempT = await accessThemes(req.query.query);
	tempT = tempT.split('|');
	tempT = tempT.join(', ');

	let tempG = await accessGenre(req.query.query);
	let tempSt = await accessFormat(req.query.query);

	let z = await occurenceSort(await recommend(req.query.query));
	
	let tempO = [];

	// console.log(z);

	for(i = 0; i < 15; i++){
		if(z[i] != null){ 
			tempO[i] = z[i][0];
		}
	}

	tempO = tempO.join(', ');

	let tempR = await accessReviews(req.query.query);
	if (tempR != null) {
		tempR = tempR.split("|");
		for (i in tempR) {
			tempR[i] = tempR[i].split('%');
			tempR[i] = tempR[i].join(' gave a review saying: ');
		}

	} else {
		tempR = [];
	}

	let r = []

	for (i in tempR) {
		r[i] = {
			"REVIEW": tempR[i]
		}

	}

	// console.log(r)

	res.render('results', {
		TITLE: req.query.query,
		AUTHOR: await accessAuthor(req.query.query),
		DESCRIPTION: await accessDescription(req.query.query),
		THEMES: tempT,
		GENRE: tempG,
		STYLE: tempSt,
		"REVIEWS": r,
		OTHERS: tempO
	});

});

app.get('/moderate', checkAuthenticated, async function(req, res) {
	let u = await grabUnmoderatedNames();
	// console.log(u);

	let uu = []

	for (let i = 0; i < u.length; i++) {
		uu[i] = {
			"unmoderated": u[i]
		}
		// console.log(uu);
	}

	res.render('moderate', {
		"unmoderateds": uu
	})
});

app.get('/approve', checkAuthenticated, async function(req, res) {
	let r = req.query.query.split(',');

	let t = r[0]
	// console.log(r[0]);
	let th = await accessUnmoderatedThemes(r[0], r[1]);
	th = th.split('|');
	th = th.join(' | ');
	let g = await accessUnmoderatedGenre(r[0], r[1]);
	let f = await accessUnmoderatedFormat(r[0], r[1]);
	let rev = await accessUnmoderatedReviews(r[0], r[1]);

	rev = rev.split('%');


	let l = await similarTo(r[0]);
	// console.log(l);

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
		REVIEW: rev[1],
		USER: rev[0],
		EMAIL: r[1],
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

// connection.query("ALTER TABLE unmoderated ADD COLUMN user TEXT;", (err) => {});

// connection.query("DELETE FROM book where id<29", (err) => {
// 	console.log();
// });

// connection.query("ALTER TABLE users ADD COLUMN genre TEXT");

// connection.query("UPDATE book SET reviews = '' where name='My Side of the Mountain'", (err) =>{});
// connection.query("UPDATE book SET description = 'My Side of the Mountain is a middle grade adventure novel written and illustrated by American writer Jean Craighead George published by E. P. Dutton in 1959. It features a boy who learns courage, independence, and the need for companionship while attempting to live in the Catskill Mountains of New York State.' where id=36", (err)=>{});
// connection.query("UPDATE book SET themes = ? where name=?;", ["Bravery|Overcoming Adversity|Perserverance and Persistance", "Island: Book One: Shipwreck"]);

connection.query("SELECT * FROM book;", (err, x) => {
	console.log(x);
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
				// console.log(importantThemes);

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
						// console.log(otherBooks);
						for (i in importantThemes) { //for each theme
							for (j in otherBooks) { //name of other book
								for (k in otherBooks[j][1]) { //k = theme of other book
									if (otherBooks[j][1][k] == importantThemes[i]) {
										let c = 0;
										for (l in recommendedBooks) {
											// if (otherBooks[j][0] == recommendedBooks[l]) {
											// 	c++;
											// }

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
						if (recommendedBooks.length > 0) {
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


function addUnmoderatedReview(t, th, r, g, f, u) {
	return new Promise((resolve, reject) => {
		// console.log(currentUser.displayName + "ARGH");
		connection.query("INSERT INTO unmoderated (name, themes, reviews, genre, format, user) VALUES (?, ?, ?, ?, ?, ?);", [t, th, currentUser.displayName + "%" + r, g, f, u], (err) => {})
	})
}

function addReview(existingBook, t, a, d, th, r, g, f) {
	return new Promise((resolve, reject) => {

		th = th.split(" | ");
		th = th.join("|");

		if (existingBook == "off") {
			connection.query("INSERT INTO book (name, author, description, themes, reviews, genre, format) VALUES (?, ?, ?, ?, ?, ?, ?);", [t, a, d, th, r, g, f], (err) => {
				// console.log(t, a, d, th, r, g, f)
			})
		} else {
			// console.log(t);
			sumReview(existingBook, r, th);
		}
	})
}

// sumReview('The God of Small Things', "new review");

function sumReview(t, r, th, user) {
	return new Promise((resolve, reject) => {

		connection.query("SELECT reviews FROM book where NAME = ?", [t], (err, d) => {
			// console.log(d);
			let reviewArray = d[0].reviews;
			if (d[0].reviews == null) {
				reviewArray = r;
			} else {
				reviewArray = r + "|" + d[0].reviews;
			}
			// console.log(reviewArray);
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
			// console.log(themeArray);
			connection.query("UPDATE book SET themes =? where name=?", [themeArray, t], (err) => {})
		});

	})
}

function grabUnmoderatedNames() {
	return new Promise((resolve, reject) => {
		connection.query("SELECT name FROM unmoderated", (err, names) => {
			connection.query("SELECT user FROM unmoderated", (err, users) => {
				let nn = [];
				// console.log(names, users)
				for (i in names) {
					nn[i] = []
					nn[i][0] = names[i].name;
					nn[i][1] = users[i].user;
				}
				resolve(nn);
			})
		})
	})
}

function accessUnmoderatedThemes(book, user) {
	// console.log(book, user);
	return new Promise((resolve, reject) => {
		connection.query("SELECT themes FROM unmoderated where name=? AND user = ?", [book, user], (err, d) => {
			// console.log(d[0]);
			resolve(d[0].themes);
		})
		// console.log(d);

	})
}

function accessUnmoderatedReviews(book, user) {
	return new Promise((resolve, reject) => {
		connection.query("SELECT reviews FROM unmoderated where name=?  AND user = ?", [book, user], (err, d) => {
			// console.log(d[0].themes);
			resolve(d[0].reviews);
		})
		// console.log(d);
	})
}

function accessUnmoderatedGenre(book, user) {
	return new Promise((resolve, reject) => {
		connection.query("SELECT genre FROM unmoderated where name=?  AND user = ?", [book, user], (err, d) => {
			// console.log(d[0].themes);
			resolve(d[0].genre);
		})
		// console.log(d);
	})
}

function accessUnmoderatedFormat(book, user) {
	return new Promise((resolve, reject) => {
		connection.query("SELECT format FROM unmoderated where name=?  AND user = ?", [book, user], (err, d) => {
			// console.log(d[0].themes);
			resolve(d[0].format);
		})
		// console.log(d);
	})
}

function updateUser(user, genre, themes, format) {
	return new Promise((resolve, reject) => {
		// console.log(user);

		themes = themes.split(" | ");
		themes = themes.join("|");

		connection.query("SELECT ID FROM users where NAME = ?", [user], (err, entry) => {
			if (entry.length == 0) {
				connection.query("INSERT INTO users (name, genre, themes, format) VALUES (?, ?, ?, ?);", [user, genre, themes, format], (err) => {});
			} else {
				sumUser(user, genre, themes, format)
			}
		})



	})
}

function sumUser(user, g, th, f) {
	return new Promise((resolve, reject) => {
		connection.query("SELECT genre FROM users where NAME = ?", [user], (err, d) => {
			// console.log(d);
			let genreArray = d[0].genre;
			if (d[0].genre == null) {
				genreArray = g;
			} else {
				genreArray = g + "|" + d[0].genre;
			}
			// console.log(genreArray);
			connection.query("UPDATE users SET genre =? where name=?", [genreArray, user], (err) => {})
		});

		connection.query("SELECT themes FROM users where NAME = ?", [user], (err, d) => {
			// console.log(d);
			let themeArray = d[0].themes;
			if (d[0].themes == null) {
				themeArray = th;
			} else {
				themeArray = th + "|" + d[0].themes;
			}
			// console.log(themeArray);
			connection.query("UPDATE users SET themes =? where name=?", [themeArray, user], (err) => {})
		});

		connection.query("SELECT format FROM users where NAME =?", [user], (err, d) => {
			let formatArray = d[0].format;
			if (d[0].format == null) {
				formatArray = f;
			} else {
				formatArray = formatArray + "|" + f;
			}
			// console.log(formatArray);
			connection.query("UPDATE users SET format =? where name=?", [formatArray, user], (err) => {})
		});

	})
}


function accessUserThemes(user) {
	return new Promise((resolve, reject) => {
		connection.query("SELECT themes FROM users where name=?", [user], (err, d) => {
			// console.log(d[0].themes);
			resolve(d[0].reviews);
		})
		// console.log(d);
	})
}

function accessUserGenre(user) {
	return new Promise((resolve, reject) => {
		connection.query("SELECT genre FROM users where name=?", [user], (err, d) => {
			// console.log(d[0].themes);
			resolve(d[0].genre);
		})
		// console.log(d);
	})
}

function accessUserFormat(user) {
	return new Promise((resolve, reject) => {
		connection.query("SELECT format FROM users where name=?", [user], (err, d) => {
			// console.log(d[0].themes);
			resolve(d[0].format);
		})
		// console.log(d);

	})
}

function gatherGenres() {
	return new Promise((resolve, reject) => {
		connection.query("SELECT genre FROM users where name=?", [currentUser.email], (err, g) => {
			if (g[0] != undefined) {
				let giggity = [];
				let genres = g[0].genre.split('|');
				genres = occurenceSort(genres);
				for (let i = 0; i < 3; i++) {
					if (genres[i] != null) {
						giggity[i] = genres[i][0];
					}
				}


				// giggity[0] = "Sorry, the user has not reviewed any genres yet!"
				resolve(giggity);
			}

			resolve(null);


		})
	})
}

function gatherFormats() {
	return new Promise((resolve, reject) => {
		connection.query("SELECT format FROM users where name=?", [currentUser.email], (err, f) => {
			if (f[0] != undefined) {
				let formats = f[0].format.split('|');
				formats = occurenceSort(formats);
				let fumble = [];
				for (let i = 0; i < 3; i++) {
					if (formats[i] != null) {
						fumble[i] = formats[i][0];
					}
				}


				// fumble[0] = "Sorry, the user has not reviewed any formats yet!"
				resolve(fumble);
			}

			resolve(null);


		})
	})
}

function gatherThemes() {
	return new Promise((resolve, reject) => {
		connection.query("SELECT themes FROM users where name=?", [currentUser.email], (err, th) => {
			if (th[0] != undefined) {
				let themes = th[0].themes.split('|');
				themes = occurenceSort(themes);
				let thorax = [];

				for (let i = 0; i < 5; i++) {
					if (themes[i] != null) {
						thorax[i] = themes[i][0];
					}

				}


				// thorax[0] = "Sorry, the user has not reviewed any themes yet!"
				resolve(thorax);
			}

			resolve(null);
		})
	})
}

function recommendUserGenre(genre, theme) {
	return new Promise((resolve, reject) => {
		let importantThemes = theme;
		// console.log(importantThemes);

		let otherBooks = [];
		let otherOtherBooks = [];
		let recommendedBooks = [];
		let n = 0;

		connection.query("SELECT name FROM book where genre = ?", [genre], (err, otherNames) => {
			connection.query("SELECT themes FROM book where genre = ?", [genre], (err, otherThemes) => {

				for (i in otherNames) {

					otherBooks[i] = [otherNames[i].name, otherThemes[i].themes.split("|")];

				}
				// console.log(otherBooks);
				for (i in importantThemes) { //for each theme
					for (j in otherBooks) { //name of other book
						for (k in otherBooks[j][1]) { //k = theme of other book
							if (otherBooks[j][1][k] == importantThemes[i]) {
								let c = 0;
								for (l in recommendedBooks) {
									// if (otherBooks[j][0] == recommendedBooks[l]) {
									// 	c++;
									// }

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

								otherOtherBooks[i] = [otherOtherNames[i].name, otherOtherThemes[i].themes.split("|")];

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
}

function recommendUserFormat(format, theme) {
	return new Promise((resolve, reject) => {
		let importantThemes = theme;
		// console.log(importantThemes);

		let otherBooks = [];
		let otherOtherBooks = [];
		let recommendedBooks = [];
		let n = 0;

		connection.query("SELECT name FROM book where format = ?", [format], (err, otherNames) => {
			connection.query("SELECT themes FROM book where format = ?", [format], (err, otherThemes) => {

				for (i in otherNames) {

					otherBooks[i] = [otherNames[i].name, otherThemes[i].themes.split("|")];

				}
				// console.log(otherBooks);
				for (i in importantThemes) { //for each theme
					for (j in otherBooks) { //name of other book
						for (k in otherBooks[j][1]) { //k = theme of other book
							if (otherBooks[j][1][k] == importantThemes[i]) {
								let c = 0;
								for (l in recommendedBooks) {
									// if (otherBooks[j][0] == recommendedBooks[l]) {
									// 	c++;
									// }

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

								otherOtherBooks[i] = [otherOtherNames[i].name, otherOtherThemes[i].themes.split("|")];

							}
							for (i in importantThemes) { //for each theme
								for (j in otherOtherBooks) { //name of other book
									let c = 0;
									for (k in otherOtherBooks[j][1]) { //k = theme of other book
										if (otherOtherBooks[j][1][k] == importantThemes[i]) {

											c++;



										}
									}
									if (c >= 3) {
										recommendedBooks[n] = otherOtherBooks[j][0];
										n++;
									}
									c = 0;
								}
							}
							if (recommendedBooks.length == 0) {
								recommendedBooks[n] = "(The library currently lacks books similar to your preferences. We apologize for the inconvenience!)";
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
}

function occurenceSort(list) {
	let newList = [];

	for (i in list) {

		let c = -1;

		for (j in newList) {

			if (list[i] == newList[j][0]) {
				c = j;
			}
		}

		if (c > -1) {

			newList[c][1]++;

			newList[i] = [];
			newList[i][0] = null;

		} else {

			newList[i] = [];

			newList[i][0] = list[i];
			newList[i][1] = 1;

		}


	}

	for (i in newList) {
		if (newList[i][0] == null || newList[i] == null) {
			newList.splice(i, 1);
			for (let j = i + 1; j < newList.length; j++) {
				newList[i] = newList[j];
			}
		}
	}

	for (let j = 0; j < newList.length; j++) {
		for (let i = 0; i < newList.length - 1; i++) {
			let purgatory;
			if (newList[i][1] < newList[i + 1][1] || newList[i][0] == null) {
				purgatory = newList[i];
				newList[i] = newList[i + 1];
				newList[i + 1] = purgatory;
			}
		}
		if (newList[newList.length - 1][0] == null) {
			newList.pop();
		}
	}



	return (newList);
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