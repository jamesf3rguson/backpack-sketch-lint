import { type } from './rules';

const MARK_REGEX = /\[BPK:([A-Za-z,]+)\]/g;
const buildLayerMarker = (violations) => `[BPK:${violations.join(',')}]`;

export default function lint() {
  var sketch = context.api();

  if (context.selection.length === 0) {
    context.document.showMessage("No selection" );
  } else {
    run(sketch.selectedDocument.selectedLayers, [type]);
  }
};

const run = (selection, activeRules) => {
  let anyViolation = false;
  selection.iterate((layer) => {
    const failedRules = [];

    activeRules.forEach((rule) => {
      if (rule.relevantToLayer(layer) && !rule.isValid(layer)) {
        anyViolation = true;
        failedRules.push(rule);
      }
    });

    const name = layer.name.replace(MARK_REGEX, "");

    if (failedRules.length > 0) {
      const marker = buildLayerMarker(failedRules.map(rule => rule.identifier));
      layer.name = `${marker}${name}`;
    } else {
      layer.name = name;
      layer.deselect();
    }
  });

  if (anyViolation) {
    context.document.showMessage("Uh oh. Backpack linting errors detected.");
  }
};
