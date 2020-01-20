// API Imports
const express = require("express");
const app = express();
const filenamify = require("filenamify");

// Youtube Imports
const fs = require("fs");
const ytdl = require("ytdl-core");

app.use(express.json());

// Endpoint de teste
app.get("/test", (request, response) => {
  console.log(request.body);
  return response.json({ message: "Tá funzionando garai!" });
});

// Endpoint para enviar e URL do vídeo a ser baixado
app.post("/url", async (request, response) => {
  const { url } = request.body; // Pega o valor da 'url' do body da request.

  let info;
  // Baixa as informações básicas do vídeo
  await ytdl.getBasicInfo(url).then(res => {
    console.log("=================================================");
    console.log("VALOR DO RES: ", res);
    console.log("=================================================");

    info = res;
  });

  await ytdl.getInfo(url).then(res => {
    console.log("=================================================");
    console.log("VALOR DO RES: ", res);
    console.log("=================================================");

    info = res;
  });

  // Baixa o áudio do vídeo
  await ytdl(url, { quality: "highestvideo" }).pipe(
    fs.createWriteStream(filenamify(info.title) + ".mp3")
  );

  console.log("=================================================");
  console.log("VALOR DO INFO: ", info);
  console.log("=================================================");

  // return response.sendFile(filenamify(info.title) + ".mp3");
  // return response.download(filenamify(info.title) + ".mp3");
  return response.json(filenamify(info.title) + ".mp3");
});

app.listen(3333);
