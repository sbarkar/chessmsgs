const express = require('express');
const app = express();

var fs = require('fs')
var indexFileContent = fs.readFileSync('public/index.html', 'utf8');

app.get('/', (req, res) => {
    // World's tiniest template engine:
    var modifiedFileContent = indexFileContent.replace(/{{url}}/g, "https://chessmsgs.com" + req.url)
    										  .replace(/{{imgUrl}}/g, "https://us-central1-chessmsgs.cloudfunctions.net/chessmsgs-image/" + encodeURI(req.query.fen) + ".png");

    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    res.send(modifiedFileContent)
})


app.use(express.static('public'));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`chessmsgs: listening on port ${port}`);
});