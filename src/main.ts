import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


export function deleteToken() {
  //localStorage.clear()
  localStorage.removeItem("token")
}
export function setToken(token: string) {
  localStorage.setItem("token", token);
}
