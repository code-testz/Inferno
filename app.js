const express = require("express")
const app = express()
const Corrosion = require("./lib/server")

const proxy = new Corrosion({
    prefix: "/go/",
    codec: "xor",
    title: "Inferno",
    forceHttps: true,
    requestMiddleware: [
        Corrosion.middleware.blacklist([
            "accounts.google.com",
        ], "Page is blocked"),
    ]
});

proxy.bundleScripts();

app.use(express.static("./public", {
    extensions: ["html"]
}));

app.get("/", function(req, res){
    res.sendFile("index.html", {root: "./public"});
});

app.use(function (req, res) {
    if (req.url.startsWith(proxy.prefix)) {
      proxy.request(req,res);
    } else {
      res.status(404).sendFile("404.html", {root: "./public"});
    }
})

app.listen(8080, () => {
    console.log(`Inferno is running at localhost:8080`)
})