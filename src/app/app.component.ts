import { Component, inject, OnInit, signal } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarModule,
} from '@angular/material/snack-bar'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { Clipboard } from '@angular/cdk/clipboard'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { HttpClient } from '@angular/common/http'
import { lastValueFrom } from 'rxjs'

export interface AdventureType {
  title: string
  description: string
  keywords: string
  example: string
  suitable: string
}

export interface Setting {
  title: string
  description: string
}

export interface System {
  name: string
  description: string
}

export interface DataFile {
  data: {
    adventureTypes: AdventureType[]
    classicSettings: Setting[]
    uniqueSettings: Setting[]
    twistedSettings: Setting[]
    systems: System[]
  }
}

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  standalone: true,
  providers: [MatSnackBar],
})
export class AppComponent implements OnInit {
  public title = 'frontend'
  public snackbar = inject(MatSnackBar)
  public selectedAdventureTypes = signal<AdventureType[]>([])
  public selectedSettings = signal<string[]>([])
  public selectedSystem: System

  public adventureTypes: AdventureType[] = [
    {
      title: 'Mysterious & Atmospheric',
      description:
        'Focuses on building suspense, hinting at hidden secrets, and emphasizing the unknown. Emphasizes a sense of foreboding and intrigue.',
      keywords: 'Suspenseful, eerie, enigmatic, unsettling, subtle.',
      example:
        'A haunted forest, ancient ruin shrouded in fog, a cryptic prophecy.',
      suitable: 'Level 3-5, players who enjoy puzzles and uncovering secrets.',
    },
    {
      title: 'Lighthearted & Humorous',
      description:
        'Emphasizes comedic situations, witty dialogue, and silly characters. Aims for enjoyment and laughs.',
      keywords: 'Funny, whimsical, goofy, silly, absurd.',
      example:
        'A quest to retrieve stolen pies, rescuing a grumpy gnome from a mischievous sprite, dealing with inept monsters.',
      suitable:
        'Players who enjoy roleplaying comedic situations and lighthearted challenges. Works well at lower levels (1-3).',
    },
    {
      title: 'Grim & Serious',
      description:
        'Focuses on dark themes, moral dilemmas, and significant consequences. Can be unsettling and challenging.',
      keywords: 'Dark, serious, dramatic, weighty, impactful.',
      example:
        'A quest to defeat a tyrannical sorcerer, investigating a corrupeted temple, dealing with loss and betrayal.',
      suitable:
        'Players who enjoy challenging encounters and complex narratives. Works well with high-level play (5+).',
    },
    {
      title: 'Epic & Heroic',
      description:
        'Focuses on grand quests, heroic deeds, and overcoming seemingly insurmountable obstacles. Emphasizes teamwork and sacrifice.',
      keywords: 'Heroic, grand, challenging, courageous, momentous.',
      example:
        'A quest to retrieve a powerful artifact, defeat a monstrous horde, save a kingdom from destruction.',
      suitable:
        'Players who enjoy a sense of accomplishment and teamwork. Works well with higher-level play.',
    },
    {
      title: 'Whimsical & Fantastical',
      description:
        'Embraces a sense of wonder, magic, and imaginative creatures. Often playful and light, event when facing challenges.',
      keywords: 'Magical, fantastical, playful, enchanting, charming.',
      example:
        'Exploring a land made of candy, befriending mischievous pixes, navigationg a world dominated by dreams.',
      suitable:
        'Players who enjoy imaginative words and whimsical adventures. Works well for every level',
    },
    {
      title: 'Mystery & intrigue',
      description:
        'Focuses on uncovering a secret, solving a puzzle, or unraveling a conspiracy. Emphasizes investigation and deduction.',
      keywords: 'Secret, puzzle, conspiracy, clues, deduction.',
      example:
        'Finding a hidden treasure, solving a murder, uncovering a plot by villains.',
      suitable:
        'Players that enjoy puzzles and detective work. Works well at any level but particularly good for higher levels.',
    },
  ]

  public classicSettings: Setting[]
  public uniqueSettings: Setting[]
  public twistedSettings: Setting[]

  public allSettings: Setting[]

  public systems: System[]

  private _clipboard: Clipboard = inject(Clipboard)

  private _http: HttpClient = inject(HttpClient)

  public constructor() {}

  public async ngOnInit(): Promise<void> {
    const data = (
      await lastValueFrom(this._http.get<DataFile>('assets/data.json'))
    ).data

    this.allSettings = [
      ...data.classicSettings,
      ...data.uniqueSettings,
      ...data.twistedSettings,
    ]
    this.adventureTypes = data.adventureTypes
    this.classicSettings = data.classicSettings
    this.uniqueSettings = data.uniqueSettings
    this.twistedSettings = data.twistedSettings
    this.systems = data.systems
  }

  public isAdventureTypeSelected(title: string): boolean {
    return this.selectedAdventureTypes().some((adv) => adv.title === title)
  }

  public selectAdventureType(adv: AdventureType): void {
    const current = this.selectedAdventureTypes()
    if (this.isAdventureTypeSelected(adv.title)) {
      this.selectedAdventureTypes.set(
        current.filter((a) => a.title !== adv.title)
      )
    } else {
      this.selectedAdventureTypes.set([...current, adv])
    }
  }

  public isSettingSelected(title: string): boolean {
    return this.selectedSettings().some((s) => s === title)
  }

  public selectSetting(title: string): void {
    const current = this.selectedSettings()
    if (this.isSettingSelected(title)) {
      this.selectedSettings.set(current.filter((s) => s !== title))
    } else {
      this.selectedSettings.set([...current, title])
    }
  }

  public generateAdventure(): void {
    let prompt =
      'Create a ' +
      this.selectedSystem.name +
      ' adventure with the following elements:\n\n'
    prompt += 'Adventure Types:\n'
    this.selectedAdventureTypes().forEach((adv) => {
      prompt += `- ${adv.title}: ${adv.description}\n`
    })
    prompt += '\nSettings:\n'
    this.selectedSettings().forEach((setting) => {
      prompt += `- ${setting}: ${this._getSettingDescription(setting)}\n`
    })
    prompt +=
      '\nThe adventure should be engaging and suitable for a ' +
      this.selectedSystem.name +
      ' game. Provide a brief overview, key locations, main NPCs, and potential plot hooks.'
    this._clipboard.copy(prompt)
    const config: MatSnackBarConfig = { duration: 3000 }
    this.snackbar.open(
      'Adventure prompt copied to clipboard, paste it into your favorite AI tool!',
      'Close',
      config
    )
  }

  private _getSettingDescription(title: string): string {
    const setting = this.allSettings.find((s) => s.title === title)
    return setting ? setting.description : 'No description available.'
  }
}
