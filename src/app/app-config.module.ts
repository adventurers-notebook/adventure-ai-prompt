import { NgModule, InjectionToken } from '@angular/core'
import { environment } from '../environments/environment'

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config')

export class AppConfig {
  public apiEndpoint: string
  public googleId: string
}

export const APP_DI_CONFIG: AppConfig = {
  apiEndpoint: environment.apiEndpoint,
  googleId: environment.googleId,
}

export const AVAILABLE_LANGUAGES = new Map<string, string>()
AVAILABLE_LANGUAGES.set('en', 'English')
AVAILABLE_LANGUAGES.set('it', 'Italiano')

export const DEFAULT_LANGUAGE = 'en'

@NgModule({
  providers: [
    {
      provide: APP_CONFIG,
      useValue: APP_DI_CONFIG,
    },
  ],
})
export class AppConfigModule {}
