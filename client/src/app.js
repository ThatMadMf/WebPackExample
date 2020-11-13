import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss'

import { renderFooter } from './components/footer/footer';

import { renderHeader } from './components/header/header';

const app = document.getElementById('app');

app.innerHTML = renderHeader() + renderFooter();