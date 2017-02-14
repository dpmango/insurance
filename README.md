# Вы-застрахованы.рф HTML/CSS Layout
Based on gulp starter package to use with PostCss/sass, pug, autoprefixer, compile bootstrap, minify assets and perform other common front-end tasks.

## DEMO link
http://dpmango.github.io/insurance

## Getting stated
__Development:__
- Install node.js and npm
- Run `npm i`
- Run `gulp` (default task)
- Work with `/src` folder and get the processing result in /dist

__Production__
- Run `gulp build`
- Check compiled result in `/dist` folder

## Tasks
- `postcss` - including sass like plugins, autoprefixer, SugarSS
- `sass` - compile .sass and .scss
- `bootstrap` - compile custom bootstrap 4 alpha 5 file
- `pug` - compile pug templates
- `useref` - optimize .css and .js
- `cssnano` - minify css in dest folder
- `images` - imagemin for graphics optimization
- `fonts` - copy fonts to dist folder
- `browserSync` - serve assets with hot reload from `./src` folder
- `clean:dist` - clean dist folder to prevent conflicts before build

## Installed plugins
- Normalize.css 5
- jQuery 3.1.1
- owl.carousel 2.2.0
- Magnific Popup 1.1.0
- Masked input
- CSS Hamburgers


### Push command (gh-pages fix)

gulp build && git add . && git commit -m "refactor, age, dist" && git push origin master && git subtree push --prefix dist origin gh-pages
