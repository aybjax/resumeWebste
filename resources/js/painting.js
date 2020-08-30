// window.axios = require('axios');
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import React from 'react';
import { render } from 'react-dom';
import {Container} from './components/Container';


render(<Container />, document.getElementById('painting'));