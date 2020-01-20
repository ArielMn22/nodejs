// API Imports
const express = require("express");
const app = express();

// Youtube Imports
const fs = require("fs");
const youtubeDl = require("youtube-dl");

app.use(express.json());

// Endpoint de teste
app.get("/test", (request, response) => {
  console.log(request.body);
  return response.json({ message: "Tá funzionando garai!" });
});

// Endpoint para enviar e URL do vídeo a ser baixado
app.post("/url", async (request, response) => {
  const { url } = request.body; // Pega o valor da 'url' do body da request.

  // let nomeVideo;

  const options = []; // Just declaring this

  // youtubeDl.getInfo(url, options, function(err, info, callback) {
  //   if (err) throw err;

  //   // console.log("id:", info.id);
  //   // console.log("title:", info.title);
  //   // console.log("url:", info.url);
  //   // console.log("thumbnail:", info.thumbnail);
  //   // console.log("descript
  //   // ion:", info.description);
  //   // console.log("filename:", info._filename);
  //   // nomeVideo = info.title;
  //   // console.log("format id:", info.format_id);
  //   // console.log("nomeVideo:", nomeVideo);

  //   const video = youtubeDl(
  //     url,
  //     // "http://www.youtube.com/watch?v=90AiXO1pAiA",
  //     // Optional arguments passed to youtube-dl.
  //     ["--format=18"],
  //     // Additional options can be given for calling `child_process.execFile()`.
  //     { cwd: __dirname }
  //   );

  //   // Will be called when the download starts.
  //   video.on("info", info => {
  //     console.log("Download started");
  //     console.log("filename: " + info._filename);
  //     console.log("size: " + info.size);
  //   });

  //   video.pipe(fs.createWriteStream(info._filename));

  //   nomeVideo = info._filename;
  //   return callback(info._filename);
  // });

  let info = await youtubeDl.getInfo(url, options);

  // const video = youtubeDl(
  //   url,
  //   // "http://www.youtube.com/watch?v=90AiXO1pAiA",
  //   // Optional arguments passed to youtube-dl.
  //   ["--format=18"],
  //   // Additional options can be given for calling `child_process.execFile()`.
  //   { cwd: __dirname }
  // );

  // // Will be called when the download starts.
  // video.on("info", info => {
  //   console.log("Download started");
  //   console.log("filename: " + info._filename);
  //   console.log("size: " + info.size);
  // });

  // video.pipe(fs.createWriteStream(info._filename));

  console.log("=================================================");
  console.log("VALOR DO INFO: ", info);
  console.log("=================================================");

  return response.json({ message: info });
});

app.listen(3333);
