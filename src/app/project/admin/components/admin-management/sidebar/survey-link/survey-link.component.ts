import { Component, OnInit } from '@angular/core';
import { TokenService } from 'auth';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-survey-link',
  templateUrl: './survey-link.component.html',
  styleUrls: ['./survey-link.component.scss']
})
export class SurveyLinkComponent implements OnInit {

  link: string;

  constructor(private tokenService: TokenService) {
    this.link = `${environment.baseFrontEndPoint}?provider=${this.tokenService.getUserId()!}`;
   }

  ngOnInit(): void {
  }

}
