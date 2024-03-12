export const json = {
  title: 'OogNed',
  completedHtml: '<h3>Bedankt voor het afronden voor de vragenlijst</h3>',
  completedBeforeHtml: '<h3>We zien dat u deze vragenlijst al hebt ingevuld.</h3>',
  loadingHtml: '<h3>Vragenlijst wordt geladen...</h3>',
  pages: [
    {
      name: 'Watzijnuwklacthen',
      elements: [
        {
          type: 'html',
          name: 'Welkom',
          html: '<p>Geachte heer/mevrouw, u bent via de huisarts hier terechtgekomen omdat u problemen heeft aan uw ogen.</p>',
        },
        {
          type: 'radiogroup',
          name: 'KlachtenGeldenVoor',
          title: 'Gelden deze klachten voor : ',
          isRequired: true,
          choices: [
            {
              value: 'Item 1',
              text: 'Rechts',
            },
            {
              value: 'Item 2',
              text: 'Links',
            },
            {
              value: 'Item 3',
              text: 'Beide',
            },
            {
              value: 'Item 4',
              text: 'Beide ogen maar andere klachten',
            },
          ],
        },
        {
          type: 'checkbox',
          name: 'Klachten',
          visibleIf: "{KlachtenGeldenVoor} anyof ['Item 1', 'Item 2', 'Item 3']",
          title: 'Wat is de reden om contact op te nemen?',
          isRequired: true,
          choices: [
            {
              value: 'Item 1',
              text: 'Verminderd Zicht',
            },
            {
              value: 'Item 2',
              text: 'Roodheid van de ogen',
            },
            {
              value: 'Item 3',
              text: 'Flitsen en Vlekken',
            },
            {
              value: 'Item 4',
              text: 'Ooglidproblemen',
            },
            {
              value: 'Item 5',
              text: 'Pijnlijke/Branderige ogen',
            },
            {
              value: 'Item 6',
              text: 'Tranen',
            },
            {
              value: 'Item 7',
              text: 'Screening/Controle op oogziektes',
            },
          ],
          showSelectAllItem: true,
          selectAllText: 'Allemaal',
        },
        {
          type: 'checkbox',
          name: 'KlachtenLinks',
          visibleIf: "{KlachtenGeldenVoor} anyof ['Item 4']",
          title: 'Wat is de reden om contact op te nemen voor het Linker oog?',
          isRequired: true,
          choices: [
            {
              value: 'Item 1',
              text: 'Verminderd Zicht',
            },
            {
              value: 'Item 2',
              text: 'Roodheid van de ogen',
            },
            {
              value: 'Item 3',
              text: 'Flitsen en Vlekken',
            },
            {
              value: 'Item 4',
              text: 'Ooglidproblemen',
            },
            {
              value: 'Item 5',
              text: 'Pijnlijke/Branderige ogen',
            },
            {
              value: 'Item 6',
              text: 'Tranen',
            },
            {
              value: 'Item 7',
              text: 'Screening/Controle op oogziektes',
            },
          ],
          showSelectAllItem: true,
          selectAllText: 'Allemaal',
        },
        {
          type: 'checkbox',
          name: 'KlachtenRechts',
          visibleIf: "{KlachtenGeldenVoor} anyof ['Item 4']",
          title: 'Wat is de reden om contact op te nemen voor het Rechter oog?',
          isRequired: true,
          choices: [
            {
              value: 'Item 1',
              text: 'Verminderd Zicht',
            },
            {
              value: 'Item 2',
              text: 'Roodheid van de ogen',
            },
            {
              value: 'Item 3',
              text: 'Flitsen en Vlekken',
            },
            {
              value: 'Item 4',
              text: 'Ooglidproblemen',
            },
            {
              value: 'Item 5',
              text: 'Pijnlijke/Branderige ogen',
            },
            {
              value: 'Item 6',
              text: 'Tranen',
            },
            {
              value: 'Item 7',
              text: 'Screening/Controle op oogziektes',
            },
          ],
          showSelectAllItem: true,
          selectAllText: 'Allemaal',
        },
      ],
      title: 'Wat zijn uw klachten?',
    },
    {
      name: 'Algemeen',
      elements: [
        {
          type: 'radiogroup',
          name: 'Vraag1',
          title: 'Leeftijd',
          isRequired: true,
          choices: [
            {
              value: 'Item 1',
              text: '0 - 12 Jaar',
            },
            {
              value: 'Item 2',
              text: '12- 20 Jaar',
            },
            {
              value: 'Item 3',
              text: '20 - 35 jaar',
            },
            {
              value: 'Item 4',
              text: '50 Jaar en ouder',
            },
          ],
        },
        {
          type: 'radiogroup',
          name: 'Vraag3',
          title: 'Geslacht',
          isRequired: true,
          choices: [
            {
              value: 'Item 1',
              text: 'Man',
            },
            {
              value: 'Item 2',
              text: 'Vrouw',
            },
            {
              value: 'Item 3',
              text: 'Anders',
            },
          ],
        },
        {
          type: 'boolean',
          name: 'Vraag4',
          title: 'Bent u eerder bij een oogarts geweest',
          isRequired: true,
          labelTrue: 'Ja',
          labelFalse: 'Nee',
          swapOrder: true,
        },
        {
          type: 'boolean',
          name: 'Vraag7',
          title: 'Heeft u suikerziekte',
          labelTrue: 'Ja',
          labelFalse: 'Nee',
          swapOrder: true,
        },
        {
          type: 'boolean',
          name: 'Vraag8',
          title: 'Heeft u een hoge bloeddruk',
          isRequired: true,
          labelTrue: 'Ja',
          labelFalse: 'Nee',
          swapOrder: true,
        },
        {
          type: 'boolean',
          name: 'Vraag9',
          title: 'Rookt u',
          isRequired: true,
          labelTrue: 'Ja',
          labelFalse: 'Nee',
          swapOrder: true,
        },
        {
          type: 'boolean',
          name: 'Vraag10',
          title: 'Bent u bekend met een lui oog',
          isRequired: true,
          labelTrue: 'Ja',
          labelFalse: 'Nee',
          swapOrder: true,
        },
        {
          type: 'checkbox',
          name: 'Vraag11',
          title: 'Komen er in de familie de volgende oogziektes voor',
          isRequired: true,
          choices: [
            {
              value: 'Item 1',
              text: 'Glaucoom',
            },
            {
              value: 'Item 2',
              text: 'Hoge Min sterkte',
            },
            {
              value: 'Item 3',
              text: 'Maculadegeneratie op jonge leeftijd',
            },
          ],
        },
      ],
      title: 'Algemene vragen',
    },
    {
      name: 'verminderdevisus',
      elements: [
        {
          type: 'radiogroup',
          name: 'Vraag12',
          title: 'Heeft u de hele dag last van het verminderde visus of wisselt het op de dag?',
          isRequired: true,
          choices: [
            {
              value: 'Item 1',
              text: 'Hele dag',
            },
            {
              value: 'Item 2',
              text: 'Wisselt op de dag',
            },
            {
              value: 'Item 3',
              text: 'Wisselt op de dag, knipperen en oogdruppels helpen goed',
            },
          ],
        },
      ],
      visibleIf: "{Klachten} contains 'Item 1' or {KlachtenLinks} contains 'Item 1' or {KlachtenRechts} contains 'Item 1'",
      title: 'Verminderde Visus',
    },
    {
      name: 'Pagina1',
      elements: [
        {
          type: 'radiogroup',
          name: 'Vraag13',
          title: 'Heeft u problemen van roodheid aan een oog of beide ogen',
          isRequired: true,
          choices: [
            {
              value: 'Item 1',
              text: 'Eén oog',
            },
            {
              value: 'Item 2',
              text: 'Beide ogen',
            },
          ],
        },
        {
          type: 'boolean',
          name: 'Vraag14',
          title: 'Is er iets in het oog gekomen',
          isRequired: true,
          labelTrue: 'Ja',
          labelFalse: 'Nee',
          swapOrder: true,
        },
        {
          type: 'imagepicker',
          name: 'Vraag2',
          title: 'Welk oog is vergelijkbaar met uw symptonen?',
          choices: [
            {
              value: 'Image 1',
              imageLink: 'https://www.pharmamarket.be/media/wysiwyg/blog/BLOG-rodeogen.jpg',
            },
            {
              value: 'Image 2',
              imageLink: 'https://www.pharmamarket.be/media/wysiwyg/blog/BLOG-rodeogen.jpg',
            },
            {
              value: 'Image 3',
              imageLink: 'https://www.pharmamarket.be/media/wysiwyg/blog/BLOG-rodeogen.jpg',
            },
            {
              value: 'Image 4',
              imageLink: 'https://www.pharmamarket.be/media/wysiwyg/blog/BLOG-rodeogen.jpg',
            },
          ],
          imageFit: 'cover',
        },
      ],
      visibleIf: "{Klachten} contains 'Item 2' or {KlachtenLinks} contains 'Item 2' or {KlachtenRechts} contains 'Item 2'",
      title: 'Roodheid',
    },
  ],
  showProgressBar: 'bottom',
  progressBarShowPageTitles: true,
  startSurveyText: 'Starten',
  pagePrevText: 'Vorige',
  pageNextText: 'Volgende',
  completeText: 'Afronden',
  firstPageIsStarted: true,
}
