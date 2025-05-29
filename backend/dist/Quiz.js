"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const IoManager_1 = require("./managers/IoManager");
const PROBLEM_TIME_S = 30;
class Quiz {
    constructor(roomId) {
        this.roomId = roomId;
        this.hasStarted = false;
        this.problems = [];
        this.activeProblem = 0;
        this.users = [];
        this.currentState = "not_started";
        console.log("room created");
        setInterval(() => {
            this.debug();
        }, 1000);
    }
    debug() {
        console.log("----debug-----");
        console.log(this.roomId);
        console.log(JSON.stringify(this.problems));
        console.log(this.users);
        console.log(this.currentState);
        console.log(this.activeProblem);
    }
    addProblem(problem) {
        this.problems.push(problem);
        console.log(this.problems);
    }
    start() {
        this.hasStarted = true;
        const io = IoManager_1.IoManager.getIo();
        this.setActiveProblem(this.problems[0]);
        //this.problems[0].startTime=new Date().getTime()
        console.log(this.problems);
    }
    setActiveProblem(problem) {
        console.log("Set active problem");
        this.currentState = "question";
        problem.startTime = new Date().getTime();
        problem.submissions = [];
        IoManager_1.IoManager.getIo().to(this.roomId).emit("problem", {
            problem
        });
        //TODO:clear this if function moves ahead
        setTimeout(() => {
            this.sendLeaderBoard();
        }, PROBLEM_TIME_S * 1000);
    }
    sendLeaderBoard() {
        console.log("send leaderboard");
        this.currentState = "leaderboard";
        const leaderBoard = this.getLeaderBoard();
        IoManager_1.IoManager.getIo().to(this.roomId).emit("leaderboard", {
            leaderboard: leaderBoard
        });
    }
    next() {
        this.activeProblem++;
        const problem = this.problems[this.activeProblem];
        if (problem) {
            this.setActiveProblem(problem);
        }
        else {
            this.activeProblem--;
            //send final results here
            //     IoManager.getIo().emit("QUIZ_ENDED",{
            //     problem: this.problems[0]
            // })
        }
    }
    getRandomStirng(length) {
        var chars = 'ABCDEGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()';
        var charLength = chars.length;
        var result = '';
        for (var i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
    }
    random() {
        return;
    }
    addUser(name) {
        const id = this.getRandomStirng(7);
        this.users.push({
            id,
            name,
            points: 0
        });
        return id;
    }
    submit(userId, roomId, problemId, submission) {
        console.log("userId");
        console.log(userId);
        const problem = this.problems.find(x => x.id == problemId);
        const user = this.users.find(x => x.id === userId);
        if (!problem || !user) {
            console.log("problem or user not found");
            return;
        }
        const extistingSubmission = problem.submissions.find(x => x.userId === userId);
        if (extistingSubmission) {
            console.log("existing submissions");
            return;
        }
        problem.submissions.push({
            problemId,
            userId,
            isCorrect: problem.answer === submission,
            optionSelected: submission
        });
        user.points += (1000 - (500 * (new Date().getTime() - problem.startTime) / (PROBLEM_TIME_S * 1000)));
    }
    getLeaderBoard() {
        return this.users.sort((a, b) => a.points < b.points ? 1 : -1).slice(0, 20);
    }
    getCurrentState() {
        if (this.currentState === "not_started") {
            return {
                type: "not_starated"
            };
        }
        if (this.currentState === "ended") {
            return {
                type: "ended",
                leaderboard: this.getLeaderBoard()
            };
        }
        if (this.currentState === "leaderboard") {
            return {
                type: "leaderboard",
                leaderboard: this.getLeaderBoard()
            };
        }
        if (this.currentState === "question") {
            const problem = this.problems[this.activeProblem];
            return {
                type: "question",
                problem
            };
        }
    }
}
exports.Quiz = Quiz;
