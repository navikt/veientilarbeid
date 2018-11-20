const watch = require("watch");
const spawn = require("cross-spawn");
const kill = require("tree-kill");
const path = require("path");
const textDirectory = path.join(__dirname, "../src/tekster");

let buildTextBundleProcess;
let isBuildProcessActive;
let waitForProcessInterval;

process.on('exit', exitHandler);

// Catch uncaught exceptions
process.on('uncaughtException', exitHandler);

// Catch ctrl + c event
process.on('SIGINT', exitHandler);


watch.watchTree(textDirectory, function (file, curr, prev) {

    if (typeof file === "object" && prev === null && curr === null) {
        // Finished walking the tree
        buildTexts();
    } else if (prev === null) {
        // File created
        if(isTextFile(file)){
            buildTexts();
        }
    } else if (curr.nlink === 0) {
        // File deleted
        if(isTextFile(file)){
            buildTexts();
        }
    } else {
        // File changed
        if(isTextFile(file)){
            buildTexts();
        }
    }

});

function isTextFile(file){
    return file.endsWith(".txt") || file.endsWith(".html");
}

function buildTexts(){

    if(isBuildProcessActive){
        let couldNotKill = false;

        buildTextBundleProcess.on("error", () => {
            couldNotKill = true;
        });

        buildTextBundleProcess.kill("SIGKILL");

        //Dont start a new interval if there is already an active one
        if(waitForProcessInterval){
            return;
        }

        waitForProcessInterval = setInterval((timeStarted) => {

            //Stop waiting for the process if it was killed (or could not be killed), or if 3 sec has passed
            if((Date.now() - timeStarted >= 3000) ||
                (couldNotKill || !isBuildProcessActive)){

                clearInterval(waitForProcessInterval);
                waitForProcessInterval = undefined;

                spawnBuildTextBundleProcess();

            }

        }, 100, Date.now());

    }else{
        spawnBuildTextBundleProcess();
    }

}

function spawnBuildTextBundleProcess(){

    buildTextBundleProcess = spawn("npm", ["run", "build:tekster"], { cwd: process.cwd() });

    isBuildProcessActive = true;

    buildTextBundleProcess.on("exit", () => {
        isBuildProcessActive = false;
    });

}

function exitHandler() {

    watch.unwatchTree(textDirectory);

    kill(process.pid);

}
