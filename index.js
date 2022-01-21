import express from "express";
import data from "./data/data.json";

const app = express();
const PORT = 3000;

// this is for the public folder on path /
app.use(express.static("public"));

// method to use JSON
//app.use(express.json());

// method to use URLEncoded
app.use(express.urlencoded({extended: true}));

// this is for the images folder on path /images
app.use("/images", express.static("images"));

app.get("/", (req, res) => res.json(data));

// JSON data
// {"hello": "JSON is cool"}
// URLEncoded data
// hello=URLEncoded+is+cool

app.post('/newItem', (req, res) => {
    console.log(req.body);
    res.send(req.body)
})

// next is the second arrow function
// you can chain as many next() functions as you want before or after the res.send() call
// **there can only be 1 res.send() call**
app.get(
  "/item/:id",
  (req, res, next) => {
    // this is the middleware that pulls the data
    let userId = Number(req.params.id);
    const user = data.filter((u) => u.id == userId)[0];
    // middleware that uses the request object
    console.log(`request from: ${req.originalUrl}`);
    console.log(`request type ${req.method}`);
    // everything above is middleware
    // express.js.com/en/guide/using-middleware.html
    res.send(user);
    next();
  },
  (req, res) => console.log("did you get the right data?")
);

app
  .route("/item")
  .get((req, res) => {
    res.send(`a get request with /item route on port ${PORT}`);
    //res.end;
    //res.redirect('http://www.google.com');
    //res.download('images/rocket.jpg')
  })
  .put((req, res) =>
    res.send(`a put request with /newItem route on port ${PORT}`)
  )
  .delete((req, res) =>
    res.send(`a delete request with /item route on port ${PORT}`)
  );

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  //console.log(data);
});
