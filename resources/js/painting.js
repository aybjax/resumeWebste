// window.axios = require('axios');
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import React from 'react';
import { render } from 'react-dom';
import {Container} from './components/Container';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()


render(<Container />, document.getElementById('painting'));1