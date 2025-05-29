"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const QuizManager_1 = require("./QuizManager");
const ADMIN_PASSWORD = "ADMIN_PASSWORD";
class UserManager {
    constructor() {
        this.quizManager = new QuizManager_1.QuizManager();
    }
    addUser(socket) {
        this.createHandlers(socket);
    }
    createHandlers(socket) {
        socket.on("join", (data) => {
            const userId = this.quizManager.addUser(data.roomId, data.name);
            socket.emit("init", {
                userId,
                state: this.quizManager.getCurrentState(data.roomId)
            });
            socket.join(data.roomId);
        });
        socket.on("joinAdmin", (data) => {
            //const userId=  this.quizManager.addUser(data.roomId,data.name)
            console.log("join admin called");
            if (data.password !== ADMIN_PASSWORD) {
                return;
            }
            // socket.emit("adminInit",{
            //     userId,
            //     state:this.quizManager.getCurrentState(roomId)
            // });
            socket.on("createQuiz", data => {
                this.quizManager.addQuiz(data.roomId);
            });
            socket.on("createProblem", data => {
                //console.log("whats the problem")
                console.log(data.problem);
                this.quizManager.addProblem(data.roomId, data.problem);
            });
            socket.on("next", data => {
                // const roomId=data.roomId;
                this.quizManager.next(data.roomId);
            });
        });
        socket.on("submit", (data) => {
            const userId = data.userId;
            const problemId = data.problemId;
            const submission = data.submission;
            const roomId = data.roomId;
            if (submission != 0 && submission != 1 && submission != 2 && submission != 3) {
                console.error("Issue while getting input" + submission);
                return;
            }
            this.quizManager.submit(userId, roomId, problemId, submission);
        });
    }
}
exports.UserManager = UserManager;
