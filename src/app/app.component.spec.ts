import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { provideHttpClient } from '@angular/common/http'
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing'

import { HarnessLoader } from '@angular/cdk/testing'
import { MatCardHarness } from '@angular/material/card/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { Clipboard } from '@angular/cdk/clipboard'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { expect } from '@jest/globals'

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let component: AppComponent
  let loader: HarnessLoader
  let clipboard: Clipboard
  let httpTestingController: HttpTestingController

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule,
      ],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })

    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    loader = TestbedHarnessEnvironment.loader(fixture)
    clipboard = TestBed.inject(Clipboard)
    httpTestingController = TestBed.inject(HttpTestingController)

    fixture.detectChanges() // This triggers ngOnInit

    const req = httpTestingController.expectOne('assets/data.json')
    req.flush({
      data: {
        systems: [{ name: 'Dungeons & Dragons', description: 'A fantasy RPG' }],
        adventureTypes: [
          { title: 'Mysterious & Atmospheric', description: '...' },
        ],
        classicSettings: [{ title: 'Medieval Kingdom', description: '...' }],
        uniqueSettings: [],
        twistedSettings: [],
      },
    })
  })

  it('should create the app', () => {
    expect(component).toBeDefined()
  })

  it('should have as title "frontend"', async () => {
    await expect(component.title).toEqual('frontend')
  })

  it('should render properly', async () => {
    const mainCard: MatCardHarness = await loader.getHarness(MatCardHarness)
    await expect(mainCard.getTitleText()).resolves.toEqual(
      'Welcome, game masters!'
    )
    await expect(mainCard.getText()).resolves.toContain(
      "Hi, I'm here to help you live memorable experiences!"
    )
  })

  it('should select an adventure type', async () => {
    expect(component.isAdventureTypeSelected('Mysterious & Atmospheric')).toBe(
      false
    )
    const myst = component.adventureTypes.filter(
      (adv) => adv.title === 'Mysterious & Atmospheric'
    )
    component.selectAdventureType(myst[0])
    expect(component.isAdventureTypeSelected('Mysterious & Atmospheric')).toBe(
      true
    )
    component.selectAdventureType(myst[0])
    expect(component.isAdventureTypeSelected('Mysterious & Atmospheric')).toBe(
      false
    )
  })

  it('should select a setting', async () => {
    expect(component.isSettingSelected('Medieval Kingdom')).toBe(false)
    component.selectSetting('Medieval Kingdom')
    expect(component.isSettingSelected('Medieval Kingdom')).toBe(true)
    component.selectSetting('Medieval Kingdom')
    expect(component.isSettingSelected('Medieval Kingdom')).toBe(false)
  })

  it('should select a system', async () => {
    expect(component.selectedSystem).toBeUndefined()
    const dnd = component.systems.filter(
      (sys) => sys.name === 'Dungeons & Dragons'
    )
    component.selectedSystem = dnd[0]
    expect(component.selectedSystem?.name).toBe('Dungeons & Dragons')
  })

  it('should generate with wrong adventure type and setting selection', async () => {
    const copySpy = jest.spyOn(clipboard, 'copy')

    component.selectedSystem = component.systems[0]
    component.selectSetting('Fantasy')

    component.generateAdventure()
    expect(copySpy).toHaveBeenCalled()

    const prompt = copySpy.mock.calls[0][0]
    expect(prompt).toContain('Adventure Types:')
    expect(prompt).toContain('Settings:')
  })

  it('should generate prompt with correct selection', async () => {
    const copySpy = jest.spyOn(clipboard, 'copy')

    component.selectedSystem = component.systems[0]

    component.selectSetting('Medieval Kingdom')
    const myst = component.adventureTypes.filter(
      (adv) => adv.title === 'Mysterious & Atmospheric'
    )
    component.selectAdventureType(myst[0])
    component.generateAdventure()
    expect(copySpy).toHaveBeenCalled()

    const prompt = copySpy.mock.calls[0][0]
    expect(prompt).toContain('Adventure Types:')
    expect(prompt).toContain('Settings:')
  })
})
