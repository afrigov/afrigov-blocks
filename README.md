# afrigov blocks

afrigov's components as WordPress blocks. Each block is a fixed shape you fill in on the page: you type the title onto the hero, and the service cards have an Add card button. Nothing can be dropped inside a block that does not belong there, and the editor looks like the published page.

Status: a proof, version 0.1.0, with three blocks. It is not published.

## The blocks

| Block | What you fill in | In the sidebar |
| --- | --- | --- |
| Hero | Title, a sentence under it, one or two button labels | Coloured panel, tall, whether the title is the page's main heading, where the buttons go |
| Service cards | Nothing: it holds cards, with an Add card button underneath | The edge along the top of each card (main colour, accent, the flag), and the cards' heading level |
| Service card | Title and a sentence. Where it links is shown under the card while it is selected | The link |

## How it is built

- **Dynamic blocks.** The post saves only each block's fields. `render.php` builds the HTML from afrigov's components when the page is shown. When afrigov changes a component's markup, existing pages follow, with no "This block contains unexpected content" warning.
- **Locked where it matters.** Service cards accepts only service cards, and a service card cannot sit outside service cards.
- **The page's look in the editor.** With the afrigovPress theme, the theme's own afrigov stylesheet styles the editor and the page. With another theme, the plugin loads afrigov's stylesheet itself. A theme that carries afrigov says so with `add_theme_support( 'afrigov' )`.
- **One main heading.** A hero at the top of a page is its main heading. afrigovPress then leaves out its own page title.

## Try it

The local WordPress lives in the afrigovPress folder, and this plugin is mounted into it:

```sh
npm install && npm run build      # here, in afrigov-blocks
cd ../afrigovPress && npm start   # WordPress at http://localhost:8888, admin / password
```

Open Pages, Add New, press the + at the top left, and look under afrigov. The page "Blocks proof" is built from the three blocks.

## Licence

GPL-2.0-or-later, as WordPress requires of plugins in its directory.
