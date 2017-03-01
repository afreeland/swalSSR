/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';
// When importing sweetalert2 it will throw the following
/*
ReferenceError: document is not defined
    at C:\_app\swalSSR\node_modules\sweetalert2\dist\sweetalert2.js:350:25
    at C:\_app\swalSSR\node_modules\sweetalert2\dist\sweetalert2.js:364:2
    at defaultParams.title (C:\_app\swalSSR\node_modules\sweetalert2\dist\sweetalert2.js:6:82)
    at Object.<anonymous> (C:\_app\swalSSR\node_modules\sweetalert2\dist\sweetalert2.js:9:2)
    at Module._compile (module.js:556:32)
    at Object.Module._extensions..js (module.js:565:10)
    at Module.load (module.js:473:32)
    at tryModuleLoad (module.js:432:12)
    at Function.Module._load (module.js:424:3)
    at Module.require (module.js:483:17)
    at require (internal/module.js:20:19)
    at Object.<anonymous> (C:\_app\swalSSR\build\webpack:\external "sweetalert2":1:1)
    at __webpack_require__ (C:\_app\swalSSR\build\webpack:\webpack\bootstrap f7a97e21e7f8f14fc5e8:19:1)
    at Object.<anonymous> (C:\_app\swalSSR\build\server.js:2774:70)
    at __webpack_require__ (C:\_app\swalSSR\build\webpack:\webpack\bootstrap f7a97e21e7f8f14fc5e8:19:1)
    at Object.<anonymous> (C:\_app\swalSSR\build\webpack:\src\routes\index.js:18:1)
 */

import {default as swal} from 'sweetalert2';

export default {

  path: '/',

  async action() {
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{news{title,link,content}}',
      }),
      credentials: 'include',
    });
    const { data } = await resp.json();
    if (!data || !data.news) throw new Error('Failed to load the news feed.');
    return {
      title: 'React Starter Kit',
      component: <Layout><Home news={data.news} /></Layout>,
    };
  },

};
