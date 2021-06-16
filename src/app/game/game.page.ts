import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { Question } from './../models/question';
import { OpenTriviaService } from './../open-trivia.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  difficulte = '';
  pseudo = '';
  points = 0;
  questionEnCours: Question;
  questions: Array<Question> = [];
  numeroQuestion = 0;
  choix = Array<string>();
  allerQuestionSuivante = false;
  finDuGame = false;

  constructor(private alertCtrl: AlertController, private openTriviaService: OpenTriviaService, public route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.pseudo = params['pseudo'];
      this.difficulte = params['difficulte']; 
      this.recupererQuestions();
    });
  }

  ngOnInit() {
  }

  public correction(proposition: string) {
    if (proposition === this.questionEnCours.correct_answer) {
      ++this.points;
    }
    ++this.numeroQuestion;
    if (this.numeroQuestion > this.questions.length-1) {
      this.finDuGame = true;
    } else {
      this.allerQuestionSuivante = true;
    }
  }

  public quitter() {
  }

  public async recupererQuestions() {
    this.questions = await this.openTriviaService.getQuestions(1, this.difficulte);
    this.questionSuivante();
  }

  public questionSuivante() {
    this.allerQuestionSuivante = false;
    if (this.numeroQuestion < this.questions.length) {
      this.questionEnCours = this.questions[this.numeroQuestion];
      this.randomisation();
    }
    else {
      this.finDuGame = true;
    }
  }

  public randomisation() {
    this.choix = [];
    let answers = this.questionEnCours.incorrect_answers;
    answers.push(this.questionEnCours.correct_answer);
    answers = answers.sort((a, b) => 0.5 - Math.random());
    answers.forEach(element => {
      this.choix.push(element);
    });
  }

  public async erreurMessage(header: string, message: string) {
    const alert = await this.alertCtrl.create(
      {
        header: header,
        message: message,
        buttons: ['OK']
      });
      alert.present();
  }
}

