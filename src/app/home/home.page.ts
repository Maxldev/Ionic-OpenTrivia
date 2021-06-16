import { Question } from './../models/question';
import { OpenTriviaService } from './../open-trivia.service';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public pseudo = '';
  public error = '';
  public difficulte = '';
  public sauvegarder: boolean;
  public finDuGame = false;
  
  constructor(private alertCtrl: AlertController, private openTriviaService: OpenTriviaService, private router: Router) {}

  public commencer() {
    this.error = '';
    if (this.pseudo.length < 3) {
      this.error += 'Le pseudo est trop court.';
    }
    if (this.difficulte === '') {
      this.error += ' La difficulté est requise.';
    }
    if (this.error.length === 0) {
      this.router.navigate(['/game/' + this.pseudo + '/' + this.difficulte])
    }
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
