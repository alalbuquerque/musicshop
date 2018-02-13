# Music Shop

## Stack

- Task Runner: [Webpack](https://webpack.js.org/)
- CSS Preprocessor: [SASS](https://sass-lang.com/)
- JS Framework: [ReactJS](https://reactjs.org/)

## Folders

```
musicshop/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    components/
      Button.js
      Cart.js
      Checkout.js
      FullProduct.js
      Header.js
      Modal.js
      Product.js
      ProductDetails.js
      ProductList.js
    images/
      album-photo.jpg
    styles/
      base/
        Base.scss
        Main.scss
      components/
        Button.scss
        Cart.scss
        Header.scss
        Modal.scss      
        Product.scss      
        ProductDetails.scss      
        ProductList.scss
      App.scss
    App.js
    Api.js
```

## Run the project locally

**1 -** Prepare the environment:
[install yarn](https://yarnpkg.com/lang/en/docs/install/)
```sh
$  npm install -g yarn
```

**2 -** Clone the project and install the dependencies:

```
$ git clone https://github.com/alalbuquerque/musicshop.git
$ cd musicshop/
$ yarn install
```


**3 -** Run static server and livereload:
[http://localhost:3000](http://localhost:3000)

```
$ yarn start
```

## Automatic Tasks

- `$ yarn start` Watch the files to build and start a static server.