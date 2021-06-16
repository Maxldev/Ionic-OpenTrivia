import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from './models/question';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {

 questions =  [ 
        { 
          category: "Entertainment: Japanese Anime & Manga", 
          type: "multiple", 
          difficulty: "easy", 
          question: "In Fairy Tail, what is the nickname of Natsu Dragneel?", 
          correct_answer: "The Salamander", 
          incorrect_answers: ["The Dragon Slayer", "The Dragon", "The Demon"] 
        }, 
        { 
          category: "Entertainment: Video Games", 
          type: "boolean", difficulty: "medium", 
          question: "Return to Castle Wolfenstein was the only game of the Wolfenstein series where you don't play as William B.J. Blazkowicz.", 
          correct_answer: "False", 
          incorrect_answers: ["True"]
        }
      ]

  constructor(private http: HttpClient) {}

  public getQuestions(nb: number, difficulte: string): Promise<Array<Question>> {
    return new Promise(async (resolve, reject) => {
      try 
      {
        let params = new HttpParams();
        params = params.append('amount', nb);
        /* params = params.append('category', ''); */
        params = params.append('difficulty', difficulte);
        const response = await this.http.get('https://opentdb.com/api.php', {params: params}).toPromise();
        if (response && response['results']) {
          resolve(response['results']);
        } else {
            reject('Impossible de comprendre la réponse du serveur');
        }
      } 
      catch (error) {
        console.log(error);
      }
    });
  }
}
