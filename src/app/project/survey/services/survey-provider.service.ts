import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SurveyProviderService {

  constructor() { }

  setProvider(providedId: string | undefined) {
    if (providedId)
      localStorage.setItem(TOKEN_PROVIDER, providedId);
  }

  getProvider() {
    return localStorage.getItem(TOKEN_PROVIDER);
  }

  clear() {
    localStorage.removeItem(TOKEN_PROVIDER);
  }
}


const TOKEN_PROVIDER = 'TOKEN_PROVIDER';