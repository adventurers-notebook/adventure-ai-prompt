import { Component, inject } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarModule,
} from '@angular/material/snack-bar'
import { MatExpansionModule } from '@angular/material/expansion'

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

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatExpansionModule,
  ],
  standalone: true,
  providers: [MatSnackBar],
})
export class AppComponent {
  public title = 'frontend'
  public snackbar: MatSnackBar

  public constructor() {
    this.snackbar = inject(MatSnackBar)
  }

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

  public classicSettings: Setting[] = [
    {
      title: 'Medieval Kingdom',
      description:
        'A typical medieval setting with castles, villages, knights, and political intrigue. Great for a traditional adventure feel. (Think Lord of the Rings)',
    },
    {
      title: 'Ancient Ruins',
      description:
        'Explore the crumbling remains of a long-lost civilization. Could be riddled with traps, puzzles, and ancient magic. (Think Indiana Jones meets D&D)',
    },
    {
      title: 'Forest Realm',
      description:
        'A vast and ancient forest, teeming with wildlife, hidden groves, and potentially dangerous creatures. Perfect for a quest focused on wilderness survival or a mystical journey. (Think The Witcher).',
    },
    {
      title: 'Coastal City',
      description:
        'A thriving port city with bustling markets, seafaring adventures, and hidden smuggling operations. (Think Pirates of the Caribbean)',
    },
  ]

  public uniqueSettings: Setting[] = [
    {
      title: 'Underdark',
      description:
        'A subterranean world of monstrous creatures, dark magic, and treacherous landscapes. A great setting for a challenging dungeon crawl. (Think Dungeons & Dragons 4th Edition Underdark)',
    },
    {
      title: 'Floating Islands',
      description:
        'A world where islands float amidtst the clouds, connected by magical briudges or precarious pathways. Offers unique vertical exploration and visual possibilities. (Think Avatar: The Last Airbender)',
    },
    {
      title: 'Desert Oasis',
      description:
        'A harsh desert environment with hidden oases, ancient ruins, and nomadic tribes. Perfect for a desert themed adventure. (Think Lawrence of Arabia)',
    },
    {
      title: 'Frozen Wasteland',
      description:
        'A bleak and unforgiving landscape of ice, snow, and glaciers. Great for a survival-focused quest. (Think The Frozen Wilds)',
    },
    {
      title: 'Steampunk City',
      description:
        'A Victorial-inspired city fueled by clockwork mechanisms and steam-owered technology. Offers a unique blend of fantasy and industrial elements. (Think Dishonored)',
    },
    {
      title: 'Dreamscape',
      description:
        'A surreal and ever-changing realm of dreams and nightmares. A great setting for whimsical adventures with a touch of horror. (Think Alice in Wonderland)',
    },
  ]

  public twistSettings: Setting[] = [
    {
      title: 'Underwater City',
      description:
        'A civilization thriving beneath the waves, with its own unique culture, architecture, and dangers.',
    },
    {
      title: 'Post-Apocalyptic',
      description:
        'A world ravaged by a cataclysmic event, with survivors struggling to rebuild in a desolate landscape.',
    },
    {
      title: 'Celestial Realm',
      description:
        'A heavenly plance accessible only through divine intervention. Filled with gods, angels, and other celestial beings.',
    },
  ]

  public ok(): void {
    this.snackbar.open('You clicked Ok', null, {
      duration: 1500,
    } as MatSnackBarConfig)
  }

  public cancel(): void {
    this.snackbar.open('You clicked Cancel', null, {
      duration: 1500,
    } as MatSnackBarConfig)
  }
}
