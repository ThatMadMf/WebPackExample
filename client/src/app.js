import _ from 'lodash';
import clock from 'clock';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss'

import { renderFooter } from './components/footer/footer';

import { renderHeader } from './components/header/header';
import { renderMain } from './components/main/main';
import { renderCard } from './components/card/card';


const app = document.getElementById('app');

app.innerHTML = renderHeader() + renderMain() + renderFooter();

const main = document.getElementById('main');

for (let i = 0; i < 3; i++) {
    main.innerHTML += renderCard();
}
