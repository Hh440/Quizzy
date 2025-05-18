import { IoManager } from "./managers/IoManager";

interface User{
    name:string,
    id:string
}


interface Problem{
    title:String;
     description:string;
     image:string;
     answer:String;
     options:{
        id:number;
        title:string;



     }
}


export class Quiz{

    public roomId : string;
    private hasStarted:boolean;
    private problems:Problem[];
    private activeProblem:number;
    private users:User[]


    constructor(roomId:string){

        this.roomId=roomId;
        this.hasStarted=false;
        this.problems=[];
        this.activeProblem=0;
        this.users=[]

    }



    addProblem(problem:Problem){
        this.problems.push(problem)

    }

    start(){
        this.hasStarted=true
        const io=IoManager.getIo()
        io.emit("CHANGE_PROBLEM",{
            problem: this.problems[0]
        })
        

    }

    next(){
        this.activeProblem++;

        const problem= this.problems[this.activeProblem];
        const io=IoManager.getIo()

        if(problem){
            io.emit("CHANGE_PROBLEM",{
            problem: this.problems[0]
        })

        }else{
            io.emit("QUIZ_ENDED",{
            problem: this.problems[0]
        })
        }
    }


    getRandomStirng(length:number){
        var chars =  'ABCDEGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()'
        var charLength= chars.length;
        var result= '';
        for(var i=0;i<length;i++){
            result += chars.charAt(Math.floor(Math.random()*charLength))
        }

        return result
    }

    random(){
        return 
    }


    addUser(name:string){
        const id= this.getRandomStirng(7)

        this.users.push({
            id,
            name

        })

        return id;
    }


    sumbit(roomId:string,problemId:string,submission:0|1|2|3){
        
    }
}