export default function checkFontSize() {
  var sketch = context.api();

  if (context.selection.length === 0) {
    sketch.selectedDocument.showMessage("No selection" );
  } else {
    fontSize(sketch.selectedDocument.selectedLayers);
  }
};

function fontSize(selection) {
  // declare permitted fontsizes
  var permittedFontSizes = [12,16,24,28,42];

  var anyViolation = false;

  selection.iterate((layer) => {
    if (layer.isText) {
      var permittedSize = permittedFontSizes.indexOf(layer.sketchObject.fontSize()) != -1;

      if (!permittedSize) {
        anyViolation = true;
        layer.name = `*${layer.name}`
      } else {
        layer.deselect();
      }
    }
  });

  if (anyViolation) {
    context.document.showMessage("Uh oh. Wrong font sizes detected.");

  }
};
