import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SurveyProviderService } from '../../services/survey-provider.service';

@Component({
  selector: 'app-survey-complete',
  templateUrl: './survey-complete.component.html',
  styleUrls: ['./survey-complete.component.scss']
})
export class SurveyCompleteComponent implements OnInit {

  provider: string | null | undefined;

  constructor(private surveyProviderService: SurveyProviderService, private router: Router) { }

  ngOnInit(): void {
    this.provider = this.surveyProviderService.getProvider();
  }

  startNext() { 
    this.router.navigate(['surveys'], {queryParams:{provider: this.provider}});
  }
}
