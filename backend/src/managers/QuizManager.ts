import { Quiz } from "../Quiz";
import { IoManager } from "./IoManager"


export class QuizManager{

    private quizes:Quiz[]
    constructor(){
        this.quizes=[]

    }


    public start(roomId:string){
        const io= IoManager.getIo();
      const quiz= this.quizes.find(x=>x.roomId===roomId);

      quiz.start() 

    }

    addUser(roomId:string,name:string){
       return this.getQuiz(roomId)?.addUser(name)
    }


    submit(roomId:string,problemId:string,submission:0|1|2|3){
        return this.getQuiz(roomId)?.submit(roomId,problemId,submission)


    }



    getQuiz(roomId:string){
        return this.quizes.find(x=>x.roomId===roomId)??null


    }
}