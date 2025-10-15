import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'

import { expect, jest } from '@jest/globals'

import { HarnessLoader } from '@angular/cdk/testing'
import { MatButtonHarness } from '@angular/material/button/testing'
import { MatCardHarness } from '@angular/material/card/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatSnackBarModule } from '@angular/material/snack-bar'

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let component: AppComponent
  let loader: HarnessLoader

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule,
      ],
    })
    fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    component = fixture.componentInstance
    loader = TestbedHarnessEnvironment.loader(fixture)
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
      'Welcome, developers!'
    )
    await expect(mainCard.getText()).resolves.toContain(
      "Hi, I'm here to help you live memorable experiences!"
    )
  })

  it('should display the OK snackbar', async () => {
    const snackbarSpy = jest.spyOn(component.snackbar, 'open')
    const okButton: MatButtonHarness = await loader.getHarness(
      MatButtonHarness.with({ text: 'Ok' })
    )

    await okButton.click()
    await expect(snackbarSpy).toHaveBeenCalledTimes(1)
  })

  it('should display the Cancel snackbar', async () => {
    const snackbarSpy = jest.spyOn(component.snackbar, 'open')
    const cancelButton: MatButtonHarness = await loader.getHarness(
      MatButtonHarness.with({ text: 'Cancel' })
    )

    await cancelButton.click()
    await expect(snackbarSpy).toHaveBeenCalledTimes(1)
  })
})
