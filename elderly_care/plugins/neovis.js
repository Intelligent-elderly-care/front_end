// plugins/neovis.client.js
import NeoVis from 'neovis.js';

export default (context, inject) => {
  inject('NeoVis', NeoVis);
};
