const URL = require("../models/url")

async function handleShortURL(req,res) {
  const shortID = req.params.shortID;
  const entry = await URL.findOneAndUpdate({
    shortID
  }, {$push: {
    visitHistory: {
      timestamp: Date.now()
    }
  }})

  if(!entry)
    return res.end("<h1>404 page not found</h1>")
  res.redirect(entry.redirectURL)
}

module.exports = {
  handleShortURL
}